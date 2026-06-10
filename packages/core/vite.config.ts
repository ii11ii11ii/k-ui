import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { fileURLToPath, URL } from 'node:url'

// ESM-only сборка библиотеки. vue вынесен в external (peer-зависимость).
// CSS извлекается одним файлом → dist/style.css (cssCodeSplit:false).
// Типы (.d.ts) собираются vite-plugin-dts с rollup в один index.d.ts.
export default defineConfig({
  plugins: [
    vue(),
    dts({
      include: ['src'],
      exclude: ['src/**/*.story.vue', 'src/**/*.spec.*'],
      rollupTypes: true,
      tsconfigPath: './tsconfig.json',
    }),
  ],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  build: {
    target: 'es2020',
    cssCodeSplit: false,
    lib: {
      entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
      formats: ['es'],
      fileName: () => 'k-ui.js',
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        assetFileNames: (asset) =>
          asset.name && asset.name.endsWith('.css') ? 'style.css' : (asset.name || 'asset'),
      },
    },
  },
})
