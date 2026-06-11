<script setup lang="ts">
import { ref } from 'vue'
import { KTextInput, KSelect, KNumberInput, KStepper, KCheckbox, KCheckboxGroup, KRadio, KRadioGroup, KSlider, KSearchInput, KPasswordField, KPhoneInput } from 'k-ui'
const text = ref('Иван'); const num = ref(12); const num2 = ref(6); const checks = ref(['a']); const radio = ref('1'); const slider = ref(60); const pw = ref('Secret123'); const phone = ref('+7'); const sel = ref('')
const opts = [{ value: '1', label: 'Один' }, { value: '2', label: 'Два' }]
</script>

<template>
  <Story title="Поля ввода/Все инпуты" group="components">
    <Variant title="Текст · число · выбор">
      <div style="display:flex;flex-direction:column;gap:14px;padding:24px;max-width:420px">
        <KTextInput v-model="text" icon="user" clearable />
        <KNumberInput v-model="num" :min="0" :max="100" suffix="шт" />
        <KStepper v-model="num2" suffix="мес" :min="1" />
        <KSelect v-model="sel" :options="opts" placeholder="Выберите" />
        <KSearchInput v-model="text" />
        <KPasswordField v-model="pw" />
        <KPhoneInput v-model="phone" />
      </div>
    </Variant>
    <Variant title="Чекбоксы · радио · слайдер">
      <div style="display:flex;flex-direction:column;gap:16px;padding:24px">
        <KCheckboxGroup v-model="checks" :options="[{ value: 'a', label: 'A' }, { value: 'b', label: 'B' }, { value: 'c', label: 'C' }]" inline />
        <KRadioGroup v-model="radio" :options="[{ value: '1', label: 'Раз' }, { value: '2', label: 'Два' }]" inline />
        <KSlider v-model="slider" show-value suffix="%" />
      </div>
    </Variant>
  </Story>
</template>
