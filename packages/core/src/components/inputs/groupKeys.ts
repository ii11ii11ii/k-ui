import type { InjectionKey } from 'vue'
export interface CheckboxGroupCtx { value: any[]; toggle: (v: any) => void; disabled: boolean }
export const CheckboxGroupKey: InjectionKey<CheckboxGroupCtx> = Symbol('k-checkbox-group')
export interface RadioGroupCtx { value: any; pick: (v: any) => void; disabled: boolean; name: string }
export const RadioGroupKey: InjectionKey<RadioGroupCtx> = Symbol('k-radio-group')
