import { defineConfig } from 'histoire'
import { HstVue } from '@histoire/plugin-vue'

// Витрина компонентов. Сторисы — stories/**/*.story.vue.
// Тема/плотность/акцент управляются data-атрибутами на <html> (см. setup).
export default defineConfig({
  plugins: [HstVue()],
  setupFile: './stories/histoire.setup.ts',
  storyMatch: ['stories/**/*.story.vue'],
  theme: {
    title: 'Кометум — k-ui',
    colors: {
      primary: {
        500: '#5b5bd6',
        600: '#4f46e5',
      },
    },
  },
  tree: {
    groups: [
      { id: 'foundation', title: 'Основа' },
      { id: 'components', title: 'Компоненты' },
      { id: 'data', title: 'Данные и таблицы' },
    ],
  },
})
