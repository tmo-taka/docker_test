import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
// https://vitejs.dev/guide/build.html#library-mode

// 問題: https://stackoverflow.com/questions/72414081/vite-could-not-resolve-entry-module-index-html
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/main.js'),
      name: 'MyLib',
      fileName: 'my-lib',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['tsx'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          tsx: 'Vue',
        },
      },
    },
  },
  plugins: [react()],
  // https://github.com/vitejs/vite/discussions/3396 (デフォルトのホスト 127.0.0.1 セキュア制限でファイルを外部に公開できないため設定)
  server: {
    host: true
  }
})
