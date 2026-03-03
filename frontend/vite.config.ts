/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from '@vitejs/plugin-react'
import * as path from "path";

export default defineConfig({
  plugins: [react(),],
  server: {
    host: true,
    port: 3001,
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/test/setup.ts",
    css: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
