import { reactive, computed } from 'vue'

/* =========================================================================
   useFormGuard — единое правило валидации обязательных полей по «Сохранить».
   Кнопка «Сохранить» НЕ блокируется: клик всегда даёт обратную связь.
     const guard = useFormGuard(values, rules)
     rules: [{ key, label, test? }]   // test(values)->bool; по умолчанию непустая строка
     guard.invalid(key) -> bool       // подсветить поле (после первой попытки)
     guard.check() -> bool            // true=ок; иначе включает подсветку
     guard.missing -> [label,...]     // незаполненные (для подвала)
     guard.reset()                    // сбросить попытку (при открытии формы)
   `values` — реактивный объект (reactive/ref.value), пересчёт на лету.
   ========================================================================= */
export function useFormGuard(values, rules) {
  const st = reactive({ attempted: false })
  const get = () => (typeof values === 'function' ? values() : values)

  const failKeys = computed(() => {
    const v = get()
    return (rules || []).filter((r) => {
      const ok = r.test ? r.test(v) : String(v[r.key] == null ? '' : v[r.key]).trim() !== ''
      return !ok
    })
  })

  return reactive({
    attempted: computed(() => st.attempted),
    valid: computed(() => failKeys.value.length === 0),
    missing: computed(() => (st.attempted ? failKeys.value.map((r) => r.label).filter(Boolean) : [])),
    invalid: (key) => st.attempted && failKeys.value.some((r) => r.key === key),
    check: () => { st.attempted = true; return failKeys.value.length === 0 },
    reset: () => { st.attempted = false },
  })
}
