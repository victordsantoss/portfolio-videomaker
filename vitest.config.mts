import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: { tsconfigPaths: true },
  test: {
    environment: 'node',
    include: ['src/**/*.util.test.ts', 'src/**/*.hook.test.{ts,tsx}'],
    alias: {
      'server-only': new URL('./src/test/server-only.mock.ts', import.meta.url).pathname,
    },
  },
})
