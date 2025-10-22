/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  // 필요한 환경변수를 여기에 계속 추가 가능
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
