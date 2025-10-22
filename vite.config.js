import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/treasure-hunt-game2/', // 与仓库名完全一致
  build: {
    outDir: 'dist', // 输出目录，保持默认即可
    assetsDir: 'assets', // 资源存放目录，保持默认即可
    minify: 'terser', // 代码压缩方式，可选 'esbuild' 或 'terser'
    sourcemap: false, // 生产环境关闭 sourcemap
    rollupOptions: {
      // 确保入口文件正确
      input: {
        main: 'src/main.js',
        index: 'index.html' // 显式指定 index.html 为入口
      }
    }
  }
})