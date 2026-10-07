import { defineConfig } from "@playwright/test";
// Form-submission specs (submission.spec.ts, request-snapshots.spec.ts) were
// removed: Jarvis has no on-site request-success path to fire lead_created.
export default defineConfig({
  testDir: "./tests/measurement", workers: 1, retries: 0,
  use: { baseURL: "http://127.0.0.1:4191", browserName: "chromium", contextOptions: { reducedMotion: "reduce" } },
  webServer: {
    command: "npm run dev -- --hostname 127.0.0.1 --port 4191",
    env: { NEXT_PUBLIC_OPENAI_ADS_PIXEL_ID: "playwright-test-pixel", NODE_OPTIONS: "--import ./tests/measurement/server-fetch-fixture.mjs" },
    url: "http://127.0.0.1:4191", reuseExistingServer: false, timeout: 120000,
  },
});
