import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './jest.setup.ts',
    include: ['**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}'],
  },
})
