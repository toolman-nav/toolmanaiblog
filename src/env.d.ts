/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_GOOGLE_SITE_VERIFICATION?: string;
  readonly PUBLIC_BING_SITE_VERIFICATION?: string;
  readonly PUBLIC_BAIDU_SITE_VERIFICATION?: string;
  readonly PUBLIC_GOOGLE_ANALYTICS_ID?: string;
  readonly PUBLIC_BAIDU_TONGJI_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
