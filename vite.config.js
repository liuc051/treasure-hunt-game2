import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { copy } from 'vite-plugin-static-copy'

export default defineConfig({
  plugins: [
    vue(),
    copy({
      targets: [
        { src: 'favicon.ico', dest: 'dist' } // 将根目录的favicon.ico复制到dist根目录
      ]
    })
  ],
  base: '/treasure-hunt-game2/',
  build: {
    rollupOptions: {
      input: {
        main: 'src/main.js',
        index: 'index.html'
      }
    }
  }
})