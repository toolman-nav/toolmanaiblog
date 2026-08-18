const clean = (value) => String(value || "").trim();

// Checked-in production defaults live here so verification and analytics never
// drift between layouts/components. Cloudflare Pages environment variables can
// override them without requiring a source change.
export const INTEGRATION_DEFAULTS = Object.freeze({
  googleSiteVerification: "6AQOneCJdfTYHniCuIJc9J1MXxGoDaJ-5XpiGjUV4Vo",
  googleAnalyticsId: "G-G4K8676ZVL",
});

export function getIntegrationConfig(env = {}) {
  return {
    googleSiteVerification: clean(env.PUBLIC_GOOGLE_SITE_VERIFICATION) || INTEGRATION_DEFAULTS.googleSiteVerification,
    bingSiteVerification: clean(env.PUBLIC_BING_SITE_VERIFICATION),
    baiduSiteVerification: clean(env.PUBLIC_BAIDU_SITE_VERIFICATION),
    googleAnalyticsId: clean(env.PUBLIC_GOOGLE_ANALYTICS_ID) || INTEGRATION_DEFAULTS.googleAnalyticsId,
    baiduTongjiId: clean(env.PUBLIC_BAIDU_TONGJI_ID),
  };
}
