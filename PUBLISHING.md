# Публикация `@ii11/k-ui`

Памятка для мейнтейнера: как залить репозиторий на GitHub и как выходят релизы в **публичный npm**.

---

## A. Первая заливка репозитория (один раз)

Эта папка (`k-ui/`) — корень репозитория. Залить можно через сайт (drag-and-drop)
или через git/`gh`:

```bash
cd k-ui
git init -b main
git add .
git commit -m "init: k-ui v0.4.0"
gh repo create ii11ii11ii/k-ui --public --source=. --remote=origin --push
```

---

## B. Публикация пакета в публичный npm (npmjs.com)

Пакет публикуется в **публичный реестр npm** — устанавливается без токена
(`packages/core/package.json → publishConfig`: `registry: registry.npmjs.org`, `access: public`).

### Подготовка (один раз)
1. Аккаунт на **npmjs.com** с именем **`ii11`** (чтобы скоуп `@ii11` был ваш), email подтверждён.
2. На npm создать токен: **Access Tokens → Generate New Token** (Granular: Read and Write, All packages,
   Bypass 2FA — или классический Automation), скопировать `npm_…`.
3. В GitHub: **Settings → Secrets and variables → Actions → New repository secret**,
   имя **`NPM_TOKEN`**, значение — токен.

### Релиз (автоматически, рекомендуется)
Создать релиз на сайте (Releases → Create a new release → тег `vX.Y.Z`) **или**
нажать **Actions → Publish @ii11/k-ui → Run workflow** — робот соберёт и опубликует.

> Версия берётся из `packages/core/package.json`. Для нового релиза сначала поднимите её
> (например, правкой `"version"` на сайте или `npm -w packages/core version patch` локально) —
> npm не даёт опубликовать одну и ту же версию дважды.

### Вручную (локально, если есть Node)
```bash
npm login                       # вход в npmjs
npm install
npm -w packages/core publish --access public
```

---

## C. Установка в проекты

Без токена и без `.npmrc`:

```bash
npm install @ii11/k-ui
```

См. [`INSTALL.md`](INSTALL.md).

---

## Заметки

- **Имя пакета scoped (`@ii11/…`).** Скоуп должен совпадать с вашим именем/организацией на npm.
- **`dist/` в гит не коммитится** (`.gitignore`): пакет собирается на публикации (`prepack`) или в CI.
- Старая публикация в GitHub Packages (если была) не мешает — можно удалить в разделе Packages репозитория.
