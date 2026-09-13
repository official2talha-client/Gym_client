import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Fit Elegant Gym & Cafe -- frontend build (Phase 1: public marketing site)
export default defineConfig({
  plugins: [react()],
  server: { port: 5174 },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
