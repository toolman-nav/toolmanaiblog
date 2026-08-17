const commit = process.env.CF_PAGES_COMMIT_SHA || process.env.GITHUB_SHA || "local";

export function GET() {
  return new Response(JSON.stringify({ commit }), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}
