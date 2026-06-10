import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

// Vite-конфиг уровня монорепо — используется Histoire (stories/).
// Алиас 'k-ui' указывает на исходники пакета, чтобы сторисы импортировали
// компоненты так же, как это будет делать приложение-потребитель.
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      'k-ui': fileURLToPath(new URL('./packages/core/src/index.ts', import.meta.url)),
      '@core': fileURLToPath(new URL('./packages/core/src', import.meta.url)),
    },
  },
})
