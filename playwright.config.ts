import { defineConfig, devices } from '@playwright/test'

const PORTA = 3100
const URL_BASE = `http://localhost:${PORTA}`

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: 'list',
  use: {
    baseURL: URL_BASE,
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], channel: 'chrome' } },
    { name: 'mobile', use: { ...devices['Pixel 7'], channel: 'chrome' } },
  ],
  webServer: {
    command: `pnpm start --port ${PORTA}`,
    url: URL_BASE,
    reuseExistingServer: !process.env.CI,
  },
})
