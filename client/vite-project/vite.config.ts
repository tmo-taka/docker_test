import { defineConfig, loadEnv } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
// https://vitejs.dev/guide/build.html#library-mode

// 問題: https://stackoverflow.com/questions/72414081/vite-could-not-resolve-entry-module-index-html
export default defineConfig(({command, mode}) => {
  // NOTE: https://ja.vitejs.dev/config/#%E7%92%B0%E5%A2%83%E5%A4%89%E6%95%B0%E3%82%92%E8%A8%AD%E5%AE%9A%E3%81%AB%E4%BD%BF%E7%94%A8%E3%81%99%E3%82%8B
  const env = loadEnv(mode, process.cwd(), '')
  return {
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
    plugins: [
      react(),
      tsconfigPaths()
    ],
    envDir: './',
    // https://github.com/vitejs/vite/discussions/3396 (デフォルトのホスト 127.0.0.1 セキュア制限でファイルを外部に公開できないため設定)
    // https://ja.vitejs.dev/config/server-options.html#server-hmr (proxyのリバースがうまくいかない問題)
    server: {
      host: true,
      port: 5173,
      proxy: {
        '^/qiita-api': {
          target: env.VITE_QIITA_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/qiita-api/, ''),
        },
        '^/auth-api': {
          target: env.AUTH_API_URL,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/auth-api/, ''),
        },
      },
      // NOTE: ホッとリロード追加
      watch: {
        usePolling: true
      }
    },
    css: {
      preprocessorOptions: {
        css: {
          additionalData: `@import "@/assets/reset.css";`
        }
      }
    }
  }
})
