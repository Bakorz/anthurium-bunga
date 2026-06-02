import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// ============================================================
// Vite Configuration
// --------------------------------------------------------
// DEVELOPMENT:
//   Run `npm run dev` (Vite on :5173) + `npm run dev:api`
//   (Express on :3001). Vite proxies /api/* to :3001.
//
// PRODUCTION (Vercel):
//   The serverless function handles /api/* — no proxy needed.
//   Vercel serves the static build + rewrites SPA routes.
// ============================================================

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      // During development, proxy API calls to the dev API server
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
})