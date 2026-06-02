// ============================================================
// Vercel Serverless Function: /api/metabase/embed-url
// --------------------------------------------------------
// Replaces the Express backend (server/) with a single
// serverless function that runs on Vercel's edge/runtime.
//
// HOW THIS WORKS:
// ────────────────────────────────────────────────────────────
// 1. The React frontend calls GET /api/metabase/embed-url
// 2. Vercel routes this request to this serverless function
// 3. This function signs a JWT using METABASE_SECRET_KEY
// 4. It returns { iframeUrl } pointing to the remote Metabase
// 5. The browser loads the iframe directly from metabase.cronous.my.id
//
// DEPLOYMENT:
//   - Push to Vercel (or run `vercel deploy`)
//   - Set env vars in Vercel Dashboard > Settings > Environment Variables
//     or via `vercel env add` CLI command
//   - The /api/* route is auto-detected by Vercel
//
// LOCAL DEVELOPMENT:
//   - Run `vercel dev` to start both Vite and this function locally
//   - Or run `npm run dev` for frontend-only (API calls will 404)
//
// ENVIRONMENT VARIABLES (set in Vercel Dashboard or .env):
//   METABASE_SITE_URL   - e.g., https://metabase.cronous.my.id
//   METABASE_SECRET_KEY  - Embedding secret from Metabase Admin
//   DASHBOARD_ID         - Numeric dashboard ID to embed
// ============================================================

import jwt from 'jsonwebtoken'

// ----------------------------------------------------------
// Environment variables are available via process.env
// In Vercel, set these in Dashboard > Settings > Environment Variables
// For local dev with `vercel dev`, use a .env file in project root
// ----------------------------------------------------------
const METABASE_SITE_URL = process.env.METABASE_SITE_URL
const METABASE_SECRET_KEY = process.env.METABASE_SECRET_KEY
const DASHBOARD_ID = process.env.DASHBOARD_ID

export default async function handler(req, res) {
  // ----------------------------------------------------------
  // Only allow GET requests
  // ----------------------------------------------------------
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  // ----------------------------------------------------------
  // Validate environment variables
  // ----------------------------------------------------------
  if (!METABASE_SITE_URL || !METABASE_SECRET_KEY || !DASHBOARD_ID) {
    console.error('Missing required env vars: METABASE_SITE_URL, METABASE_SECRET_KEY, DASHBOARD_ID')
    res.status(500).json({
      error: 'Server configuration error: missing environment variables',
      hint: 'Set METABASE_SITE_URL, METABASE_SECRET_KEY, and DASHBOARD_ID in Vercel Dashboard > Settings > Environment Variables',
    })
    return
  }

  try {
    // --------------------------------------------------------
    // STEP 1: Define the JWT Payload
    // --------------------------------------------------------
    const payload = {
      resource: { dashboard: parseInt(DASHBOARD_ID, 10) },
      params: {},
      // Token expires in 10 minutes
      exp: Math.floor(Date.now() / 1000) + (10 * 60),
    }

    // --------------------------------------------------------
    // STEP 2: Sign the JWT Token
    // - Uses HMAC-SHA256 (HS256), Metabase's default
    // - The secret must match the one in Metabase Admin settings
    // --------------------------------------------------------
    const token = jwt.sign(payload, METABASE_SECRET_KEY, {
      algorithm: 'HS256',
    })

    // --------------------------------------------------------
    // STEP 3: Construct the Embedding URL
    // - Points to the remote Metabase instance
    // - e.g., https://metabase.cronous.my.id/embed/dashboard/eyJ...
    // --------------------------------------------------------
    const iframeUrl = `${METABASE_SITE_URL}/embed/dashboard/${token}`

    // --------------------------------------------------------
    // STEP 4: Return the URL
    // --------------------------------------------------------
    res.status(200).json({ iframeUrl })
  } catch (err) {
    console.error('Error generating embed URL:', err)
    res.status(500).json({
      error: 'Failed to generate embed URL',
      details: err.message,
    })
  }
}