// https://zenn.dev/longbridge/articles/575190b038f805
/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_QIITA_API_ACCESS_TOKEN: string
    readonly VITE_QIITA_API_URL: string
    readonly AUTH_API_URL: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
