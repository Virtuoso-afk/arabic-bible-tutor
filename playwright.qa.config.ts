import { defineConfig, devices } from "@playwright/test";

const includeDownloadedEngines = process.env.QA_ALL_BROWSERS === "1";

export default defineConfig({
  testDir: "./qa-tests",
  fullyParallel: false,
  forbidOnly: Boolean(process.env.CI),
  retries: 0,
  workers: 1,
  reporter: "list",
  use: {
    baseURL: "http://127.0.0.1:3000",
    locale: "ar-EG",
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "chromium-production",
      use: {
        ...devices["Desktop Chrome"],
        launchOptions: { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH ?? "/usr/bin/chromium", args: ["--no-sandbox"] },
      },
    },
    ...(includeDownloadedEngines ? [
      { name: "firefox-production", use: { ...devices["Desktop Firefox"] } },
      { name: "webkit-production", use: { ...devices["Desktop Safari"] } },
    ] : []),
  ],
  webServer: {
    command: "npm run build && npm run start -- --hostname 127.0.0.1 --port 3000",
    url: "http://127.0.0.1:3000",
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
