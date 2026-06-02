// ============================================================
// API Configuration (src/utils/api.js)
// --------------------------------------------------------
// Centralizes the backend API base URL for all fetch calls.
//
// ON VERCEL:
//   The API route /api/metabase/embed-url is served by a
//   Vercel serverless function (api/metabase/embed-url.js).
//   Both the frontend and API are on the same domain, so
//   a simple relative path works. No proxy, no CORS issues.
//
// LOCAL DEVELOPMENT:
//   Run `vercel dev` — it starts both the Vite frontend and
//   the serverless function on the same port automatically.
//   Relative paths work out of the box.
//
// FALLBACK (separate backend domain):
//   If you ever need to point to a different backend, set
//   VITE_API_BASE_URL in .env.production:
//     VITE_API_BASE_URL=https://api.yourdomain.com
// ============================================================

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

export function getApiUrl(path) {
  const base = API_BASE_URL.replace(/\/$/, '')
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  return `${base}${cleanPath}`
}

export { API_BASE_URL }