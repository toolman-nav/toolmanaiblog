const siteOrigin = "https://toolmanai.com";
const key = "41edbf7721a023c052c2d785e69dab39";
const keyFileName = `${key}.txt`;

module.exports = Object.freeze({
  endpoint: "https://api.indexnow.org/indexnow",
  deploymentMarkerUrl: `${siteOrigin}/deployment.json`,
  host: new URL(siteOrigin).host,
  key,
  keyFileName,
  keyLocation: `${siteOrigin}/${keyFileName}`,
  siteOrigin,
});
