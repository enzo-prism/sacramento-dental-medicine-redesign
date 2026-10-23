// Loaded only by Playwright's local development server. Every outbound
// fetch is intercepted; this is never deployed or imported by app code.
// Formspree is stubbed. Everything else — including LEAD_WEBHOOK_URL —
// is rejected so measurement specs cannot leak to the network.
globalThis.fetch = async (input, init) => {
  const url = new URL(typeof input === "string" || input instanceof URL ? input : input.url);
  if (url.hostname === "formspree.io") {
    const body = JSON.parse(typeof init?.body === "string" ? init.body : "{}");
    const accepted = body.name === "Local Success Fixture";
    return new Response(accepted ? '{"ok":true}' : '{"errors":[{"message":"Local failure fixture"}]}', {
      status: accepted ? 200 : 400, headers: { "Content-Type": "application/json" },
    });
  }
  throw new Error(`Unmocked fetch blocked: ${url.href}`);
};
