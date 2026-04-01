/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PEXELS_API_KEY: string;
  readonly NAVER_CLIENT_ID: string;
  readonly NAVER_CLIENT_SECRET: string;
  readonly FOOD_SAFETY_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
