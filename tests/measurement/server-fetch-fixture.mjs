// Loaded only by Playwright's local development server. Every Formspree POST
// is intercepted before transport; this is never deployed or imported by app code.
const originalFetch = globalThis.fetch;
globalThis.fetch = async (input, init) => {
  const url = new URL(typeof input === "string" || input instanceof URL ? input : input.url);
  if (url.hostname === "formspree.io") {
    const body = JSON.parse(typeof init?.body === "string" ? init.body : "{}");
    const accepted = body.name === "Local Success Fixture";
    return new Response(accepted ? '{"ok":true}' : '{"errors":[{"message":"Local failure fixture"}]}', {
      status: accepted ? 200 : 400, headers: { "Content-Type": "application/json" },
    });
  }
  return originalFetch(input, init);
};
