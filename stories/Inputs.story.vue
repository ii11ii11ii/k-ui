<script setup lang="ts">
import { ref } from 'vue'
import { TextInput, Select, NumberInput, Stepper, Checkbox, CheckboxGroup, Radio, RadioGroup, Slider, SearchInput, PasswordField, PhoneInput } from 'k-ui'
const text = ref('Иван'); const num = ref(12); const num2 = ref(6); const checks = ref(['a']); const radio = ref('1'); const slider = ref(60); const pw = ref('Secret123'); const phone = ref('+7'); const sel = ref('')
const opts = [{ value: '1', label: 'Один' }, { value: '2', label: 'Два' }]
</script>

<template>
  <Story title="Поля ввода/Все инпуты" group="components">
    <Variant title="Текст · число · выбор">
      <div style="display:flex;flex-direction:column;gap:14px;padding:24px;max-width:420px">
        <TextInput v-model="text" icon="user" clearable />
        <NumberInput v-model="num" :min="0" :max="100" suffix="шт" />
        <Stepper v-model="num2" suffix="мес" :min="1" />
        <Select v-model="sel" :options="opts" placeholder="Выберите" />
        <SearchInput v-model="text" />
        <PasswordField v-model="pw" />
        <PhoneInput v-model="phone" />
      </div>
    </Variant>
    <Variant title="Чекбоксы · радио · слайдер">
      <div style="display:flex;flex-direction:column;gap:16px;padding:24px">
        <CheckboxGroup v-model="checks" :options="[{ value: 'a', label: 'A' }, { value: 'b', label: 'B' }, { value: 'c', label: 'C' }]" inline />
        <RadioGroup v-model="radio" :options="[{ value: '1', label: 'Раз' }, { value: '2', label: 'Два' }]" inline />
        <Slider v-model="slider" show-value suffix="%" />
      </div>
    </Variant>
  </Story>
</template>
