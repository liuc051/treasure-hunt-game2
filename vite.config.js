import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/treasure-hunt-game2/',
    build: {
    entry: 'src/main.js', // 明确入口文件
  }
})