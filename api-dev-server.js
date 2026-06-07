// ============================================================
// Development API Server (api-dev-server.js)
// --------------------------------------------------------
// A lightweight Express server for LOCAL DEVELOPMENT ONLY.
// Simulates the Vercel serverless function so you can test
// the full pipeline with `npm run dev` + `npm run dev:api`.
//
// DO NOT use this in production — Vercel handles that.
//
// Usage:
//   npm run dev       (terminal 1 — Vite frontend)
//   npm run dev:api   (terminal 2 — this API server)
// ============================================================

import express from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.API_PORT || 3001

const METABASE_SITE_URL = process.env.METABASE_SITE_URL
const METABASE_SECRET_KEY = process.env.METABASE_SECRET_KEY
const DASHBOARD_ID = process.env.DASHBOARD_ID

if (!METABASE_SITE_URL || !METABASE_SECRET_KEY || !DASHBOARD_ID) {
  console.error('Missing env vars: METABASE_SITE_URL, METABASE_SECRET_KEY, DASHBOARD_ID')
  console.error('Create a .env file in the project root.')
  process.exit(1)
}

app.use(cors())
app.use(express.json())

app.get('/api/metabase/embed-url', (req, res) => {
  try {
    // 1. Tangkap parameter location dari frontend
    const { location } = req.query;

    const payload = {
      resource: { dashboard: parseInt(DASHBOARD_ID, 10) },
      params: {
        // 2. Masukkan parameter ke payload jika 'location' dikirimkan oleh frontend
        ...(location && { location: [location] })
      },
      exp: Math.floor(Date.now() / 1000) + (10 * 60),
    }

    const token = jwt.sign(payload, METABASE_SECRET_KEY, { algorithm: 'HS256' })
    const iframeUrl = `${METABASE_SITE_URL}/embed/dashboard/${token}`

    console.log(`Embed URL generated for dashboard ${DASHBOARD_ID} | Location Filter: ${location || 'None'}`)
    res.json({ iframeUrl })
  } catch (err) {
    console.error('Error:', err)
    res.status(500).json({ error: 'Failed to generate embed URL' })
  }
})

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', metabaseSiteUrl: METABASE_SITE_URL, dashboardId: DASHBOARD_ID })
})

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`)
  console.log(`  Metabase: ${METABASE_SITE_URL}`)
  console.log(`  Dashboard: ${DASHBOARD_ID}`)
})