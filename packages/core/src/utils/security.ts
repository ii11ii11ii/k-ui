/* Кометум Admin — единый модуль безопасности (window.KSEC).
   ───────────────────────────────────────────────────────────────────────
   Назначение: изолировать пользовательский ввод и загружаемые файлы от
   инъекций (XSS / HTML-injection) и подготовить проект к безопасному
   экспорту в Vue 3, где те же утилиты переносятся как `src/lib/security.js`.

   Что внутри:
   • escapeHtml(str)          — экранирование текста перед вставкой в HTML-строку
                                (счёт/лицензия/договор открываются как Blob в новой
                                вкладке — это та же origin, поэтому неэкранированное
                                имя плательщика = stored-XSS). ВСЕГДА оборачивать
                                любые подстановки в HTML-шаблоны печати.
   • sanitizeHtml(html)       — белый список тегов/атрибутов для форматированного
                                текста договора (редактируется WYSIWYG-ом и
                                рендерится через dangerouslySetInnerHTML / v-html).
                                Срезает <script>, on*-обработчики, javascript:-URL,
                                <iframe>/<object>/<embed> и пр.
   • sanitizeFileName(name)   — безопасное имя файла (убирает путь-traversal,
                                управляющие символы, ограничивает длину).
   • validateUpload(file,opt) — проверка загружаемого файла по белому списку
                                MIME/расширений и лимиту размера. Возвращает
                                { ok, reason }. Источник правды для ВСЕХ загрузок.
   • safeFileUrl(file)        — Blob-URL только для прошедших валидацию файлов.

   Для Vue: всё чистые функции без побочных эффектов, кроме safeFileUrl
   (URL.createObjectURL) — в Vue вынести в composable с revoke на unmount.
*/

  // ── экранирование текста для вставки в HTML ──────────────────────────
  const HTML_ESC = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  function escapeHtml(str) {
    if (str === null || str === undefined) return "";
    return String(str).replace(/[&<>"']/g, (c) => HTML_ESC[c]);
  }
  // экранирование значения атрибута (то же + перенос строк)
  function escapeAttr(str) {
    return escapeHtml(str).replace(/\r?\n/g, " ");
  }

  // ── белый список для форматированного HTML (текст договора) ──────────
  // Разрешаем только безопасную типографику. Всё прочее (скрипты, события,
  // ссылки на javascript:, медиа/фреймы) вырезается.
  const ALLOWED_TAGS = new Set(["P", "BR", "B", "STRONG", "I", "EM", "U", "UL", "OL", "LI", "SPAN", "DIV", "H3", "H4"]);
  const ALLOWED_ATTR = new Set(["style"]);
  // в style оставляем только text-align (выравнивание абзацев договора)
  function sanitizeStyle(value) {
    const out = [];
    String(value || "").split(";").forEach((decl) => {
      const [propRaw, valRaw] = decl.split(":");
      if (!propRaw || !valRaw) return;
      const prop = propRaw.trim().toLowerCase();
      const val = valRaw.trim().toLowerCase();
      if (prop === "text-align" && /^(left|right|center|justify)$/.test(val)) out.push(`text-align:${val}`);
      if (prop === "font-weight" && /^(bold|[1-9]00)$/.test(val)) out.push(`font-weight:${val}`);
      if (prop === "font-style" && /^(italic|normal)$/.test(val)) out.push(`font-style:${val}`);
    });
    return out.join(";");
  }
  function sanitizeHtml(html) {
    if (html === null || html === undefined) return "";
    let doc;
    try {
      doc = new DOMParser().parseFromString("<div>" + String(html) + "</div>", "text/html");
    } catch (e) { return escapeHtml(html); }
    const root = doc.body.firstChild;
    if (!root) return "";
    const walk = (node) => {
      // обходим копию списка детей — будем удалять по ходу
      Array.from(node.childNodes).forEach((child) => {
        if (child.nodeType === 3) return; // текст — безопасен
        if (child.nodeType !== 1) { child.remove(); return; } // комментарии и пр. — вон
        const tag = child.tagName.toUpperCase();
        if (!ALLOWED_TAGS.has(tag)) {
          // запрещённый тег: разворачиваем его текст, сам элемент убираем
          const text = doc.createTextNode(child.textContent || "");
          child.replaceWith(text);
          return;
        }
        // чистим атрибуты
        Array.from(child.attributes).forEach((attr) => {
          const name = attr.name.toLowerCase();
          if (!ALLOWED_ATTR.has(name) || name.startsWith("on")) { child.removeAttribute(attr.name); return; }
          if (name === "style") {
            const safe = sanitizeStyle(attr.value);
            if (safe) child.setAttribute("style", safe); else child.removeAttribute("style");
          }
        });
        walk(child);
      });
    };
    walk(root);
    return root.innerHTML;
  }

  // ── безопасное имя файла ─────────────────────────────────────────────
  function sanitizeFileName(name, opts) {
    const o = opts || {};
    let s = String(name == null ? "" : name);
    s = s.replace(/[\u0000-\u001f\u007f]/g, "");          // управляющие символы
    s = s.replace(/[\\/]/g, "_");                          // разделители пути (traversal)
    s = s.replace(/^\.+/, "");                              // ведущие точки (скрытые/.. )
    s = s.replace(/[<>:"|?*]/g, "_");                      // запрещённые в FS символы
    s = s.replace(/\s+/g, " ").trim();
    if (!s) s = "file";
    const max = o.maxLen || 120;
    if (s.length > max) {                                   // ограничение длины с сохранением расширения
      const dot = s.lastIndexOf(".");
      if (dot > 0 && s.length - dot <= 10) s = s.slice(0, max - (s.length - dot)) + s.slice(dot);
      else s = s.slice(0, max);
    }
    return s;
  }

  // ── валидация загружаемого файла ─────────────────────────────────────
  // По умолчанию — только PDF до 20 МБ. Проверяем и MIME, и расширение,
  // и непустоту. Источник правды для обоих экранов загрузки.
  const UPLOAD_DEFAULTS = {
    maxBytes: 20 * 1024 * 1024,
    accept: [{ mime: "application/pdf", ext: ["pdf"], label: "PDF" }],
  };
  function humanSize(bytes) {
    if (!bytes && bytes !== 0) return "";
    if (bytes < 1024) return bytes + " Б";
    if (bytes < 1048576) return (bytes / 1024).toFixed(0) + " КБ";
    return (bytes / 1048576).toFixed(1) + " МБ";
  }
  function validateUpload(file, opts) {
    const o = Object.assign({}, UPLOAD_DEFAULTS, opts || {});
    if (!file) return { ok: false, reason: "Файл не выбран." };
    if (!file.size) return { ok: false, reason: "Файл пустой." };
    if (file.size > o.maxBytes) return { ok: false, reason: `Файл больше ${humanSize(o.maxBytes)}. Уменьшите размер.` };
    const name = String(file.name || "");
    const ext = (name.split(".").pop() || "").toLowerCase();
    const accepts = o.accept;
    const okType = accepts.some((a) => {
      const mimeOk = a.mime ? file.type === a.mime : true;
      const extOk = a.ext ? a.ext.includes(ext) : true;
      // тип браузер иногда не проставляет — тогда полагаемся на расширение
      return (file.type ? mimeOk : true) && extOk;
    });
    if (!okType) {
      const labels = accepts.map((a) => a.label || a.mime).join(", ");
      return { ok: false, reason: `Недопустимый тип файла. Разрешено: ${labels}.` };
    }
    return { ok: true, name: sanitizeFileName(name), size: file.size, sizeText: humanSize(file.size) };
  }

  // Blob-URL только для валидного файла (иначе null). Вызывающий код обязан
  // revokeObjectURL по завершении (в прототипе — через setTimeout/при удалении).
  function safeFileUrl(file, opts) {
    const v = validateUpload(file, opts);
    if (!v.ok) return null;
    try { return URL.createObjectURL(file); } catch (e) { return null; }
  }

  export const KSEC = { escapeHtml, escapeAttr, sanitizeHtml, sanitizeFileName, validateUpload, safeFileUrl, humanSize };
  export { escapeHtml, escapeAttr, sanitizeHtml, sanitizeFileName, validateUpload, safeFileUrl, humanSize };
