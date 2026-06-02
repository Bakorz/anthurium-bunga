# AGENTS.md

## Project Overview

WSIG — React frontend that securely embeds a Metabase choropleth map dashboard ("Anthurium Flower Harvest Area in Indonesia"). Metabase is hosted remotely at `metabase.cronous.my.id`.

## Architecture

Single Vercel deployment with a serverless function for JWT signing:

```
Browser ──fetch──▶ /api/metabase/embed-url (Vercel serverless)
   │                 └─ signs JWT with METABASE_SECRET_KEY
   └──iframe──▶ metabase.cronous.my.id (remote Metabase)
```

- **Frontend**: React 19 + Vite 8 + Tailwind v4 + React Router 7
- **API**: `api/metabase/embed-url.js` — Vercel serverless function (jsonwebtoken HS256)
- **Dev API**: `api-dev-server.js` — Express server for local development (port 3001)

## Dev Commands

```bash
# Full stack locally (two terminals):
npm run dev          # Terminal 1: Vite frontend on :5173
npm run dev:api      # Terminal 2: API server on :3001 (proxied by Vite)

# Other commands:
npm run build        # Production build
npm run lint         # ESLint (src/ = browser env, api/ = node env)
```

**`vercel dev` does NOT work** with Vite 8 — Vercel injects `--port $PORT` which crashes Vite. Use `npm run dev` + `npm run dev:api` instead.

## Deployment

```bash
vercel deploy
```

Set env vars in Vercel Dashboard > Settings > Environment Variables:

| Variable | Required | Example |
|---|---|---|
| `METABASE_SITE_URL` | Yes | `https://metabase.cronous.my.id` |
| `METABASE_SECRET_KEY` | Yes | (from Metabase Admin > Settings > Embedding) |
| `DASHBOARD_ID` | Yes | `3` |

`vercel.json` handles SPA rewrites. `api/` directory is auto-detected as serverless functions.

## Environment Variables

### Local dev (`.env` in project root — gitignored):

```
METABASE_SITE_URL=https://metabase.cronous.my.id
METABASE_SECRET_KEY=your_key_here
DASHBOARD_ID=3
VITE_API_BASE_URL=
```

- `VITE_API_BASE_URL`: Leave empty — Vite proxies `/api/*` to `:3001` locally; same-origin on Vercel.
- `.env.example` is the template; `.env` is gitignored.

### Vercel production:

Set `METABASE_SITE_URL`, `METABASE_SECRET_KEY`, `DASHBOARD_ID` in Vercel Dashboard. No `VITE_API_BASE_URL` needed.

## Key Files

```
src/
  main.jsx                       # Entry, BrowserRouter
  App.jsx                        # Route definitions
  index.css                      # Tailwind v4 @import
  utils/api.js                   # getApiUrl() — use for all API calls
  layouts/MainLayout.jsx         # Navbar + Outlet + Footer
  components/Navbar.jsx          # Responsive top nav
  components/MetabaseDashboard.jsx  # Reusable iframe component
  pages/Home.jsx                 # Landing page at /
  pages/MapDashboard.jsx         # Dashboard at /dashboard
api/
  metabase/embed-url.js          # Vercel serverless JWT function
api-dev-server.js                # Local dev Express server (port 3001)
vercel.json                      # SPA rewrites + framework config
```

## Key Routing & API Flow

1. User visits `/dashboard` → `MapDashboard` component
2. `MapDashboard` calls `fetch(getApiUrl('/api/metabase/embed-url'))`
3. Dev: Vite proxies to `localhost:3001`. Prod: Vercel serverless function.
4. Backend signs JWT (HS256) with `METABASE_SECRET_KEY`, returns `{ iframeUrl }`
5. `MetabaseDashboard` renders `<iframe src={iframeUrl}>`
6. Browser loads iframe directly from `metabase.cronous.my.id`

## Gotchas

- **Tailwind v4**: Uses `@import "tailwindcss"` — no `tailwind.config.js`. Handled by `@tailwindcss/vite` plugin.
- **`vercel dev` is broken with Vite 8**: Use `npm run dev` + `npm run dev:api` for local development.
- **JWT expiration**: Tokens expire in 10 minutes. Frontend re-fetches on page load only.
- **`type: "module"`**: All JS uses ES modules (`import`/`export`).
- **`.env` is gitignored**: Create from `.env.example`.
- **ESLint split config**: `src/**` uses browser globals, `api/**` uses node globals.
- **No tests yet**.