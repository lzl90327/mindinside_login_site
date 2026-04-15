/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** API 根，如 `https://api.example.com`；留空则走同源相对路径 */
  readonly VITE_API_BASE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
