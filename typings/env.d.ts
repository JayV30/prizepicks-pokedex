/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ROUTER_BASENAME: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
