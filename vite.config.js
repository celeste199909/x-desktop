import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import path from "path" // 第一步：下载插件npm i path

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [vue()],
  resolve: {//第二步：配置相对路径别名
    alias: {
      '@': path.resolve('./src'), // 相对路径别名配置，使用@代替src
      '@com': path.resolve('./src/components'),
    }
  },
  build: {
    minify: false,
    rollupOptions:{
      // 不压缩代码
      output:{
        minifyInternalExports:false
      }
    }
  }
})
