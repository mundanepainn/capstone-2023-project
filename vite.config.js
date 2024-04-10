import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  tests: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./testings/setupTests.js"
  }
})
