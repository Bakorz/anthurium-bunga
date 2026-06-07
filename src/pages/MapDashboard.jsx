import { useState, useEffect } from 'react'
import { getApiUrl } from '../utils/api'
import MetabaseDashboard from '../components/MetabaseDashboard'

import SmartAlert from '../components/SmartAlert'
import { useReactToPrint } from 'react-to-print'

// ============================================================
// MapDashboard Page (src/pages/MapDashboard.jsx)
// --------------------------------------------------------
// The main dashboard page that embeds the Metabase choropleth
// map visualization for "Anthurium Flower Harvest Area in
// Indonesia".
//
// ARCHITECTURE (Vercel Serverless):
// ┌──────────────────────────────────────────────────────────────┐
// │  Vercel Deployment                                           │
// │                                                              │
// │  ┌─────────────────┐        ┌──────────────────────────┐   │
// │  │  React Frontend  │  fetch │  Vercel Serverless Fn     │   │
// │  │  (static CDN)    │───────▶│  /api/metabase/embed-url │   │
// │  │                  │◀───────│  signs JWT, returns URL   │   │
// │  └─────────────────┘        └──────────────────────────┘   │
// │          │                                                   │
// │          │  iframe src = "https://metabase.cronous.my.id    │
// │          │                /embed/dashboard/<jwt-token>"     │
// │          ▼                                                   │
// │  ┌──────────────────────────────────────────────────────┐   │
// │  │  Metabase (remote)                                   │   │
// │  │  Browser loads dashboard directly from Metabase       │   │
// │  └──────────────────────────────────────────────────────┘   │
// └──────────────────────────────────────────────────────────────┘
//
// LOCAL DEVELOPMENT:
//   Run `vercel dev` — it serves both the Vite frontend and
//   the serverless function on the same port. No proxy needed.
// ============================================================

export default function MapDashboard() {
  // ----------------------------------------------------------
  // STATE
  // ----------------------------------------------------------
  const [embedUrl, setEmbedUrl] = useState(null)
  const [error, setError] = useState(null)
  const [isFetching, setIsFetching] = useState(true)

  const [dataTren, setDataTren] = useState(-2.1)
  const [dataTotal, setDataTotal] = useState(8400)


  // ----------------------------------------------------------
  // EFFECT: Fetch Embedding URL on Mount
  // - Calls the Vercel serverless function at
  //   /api/metabase/embed-url (same origin, no CORS needed)
  // ----------------------------------------------------------
  useEffect(() => {
    const fetchEmbedUrl = async () => {
      try {
        setIsFetching(true)
        setError(null)

        const url = getApiUrl('/api/metabase/embed-url')
        const response = await fetch(url)

        if (!response.ok) {
          throw new Error(
            `Gagal memuat embedding URL (HTTP ${response.status})`
          )
        }

        const data = await response.json()
        setEmbedUrl(data.iframeUrl)
      } catch (err) {
        setError(err.message)
      } finally {
        setIsFetching(false)
      }
    }

    fetchEmbedUrl()
  }, [])

  // ----------------------------------------------------------
  // RENDER: Error State
  // ----------------------------------------------------------
  if (error && !embedUrl) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <svg
            className="w-12 h-12 text-red-400 mx-auto mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L12.762 2.627c-.865-1.5-3.031-1.5-3.896 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
          <h2 className="text-lg font-semibold text-red-800 mb-2">
            Gagal Memuat Dashboard
          </h2>
          <p className="text-red-700 mb-4">{error}</p>
          <div className="text-sm text-red-600 text-left max-w-lg mx-auto">
            <p className="font-semibold mb-2">Kemungkinan penyebab:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Environment variables belum dikonfigurasi di Vercel Dashboard</li>
              <li>Metabase di <code className="bg-red-100 px-1 rounded">metabase.cronous.my.id</code> tidak dapat diakses</li>
              <li>METABASE_SECRET_KEY tidak cocok dengan remote Metabase</li>
              <li>Embedding belum diaktifkan di Metabase Admin &gt; Settings</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            Dashboard Visualisasi Luas Panen Anthurium di Indonesia
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Peta choropleth interaktif yang menampilkan data luas panen bunga Anthurium
            per provinsi di Indonesia.
          </p>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="flex-1 px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <SmartAlert trenPertumbuhan={dataTren} totalPanen={dataTotal} />
          </div>
          {isFetching ? (
            <div className="flex items-center justify-center min-h-[85vh]">
              <div className="text-center">
                <svg
                  className="animate-spin h-10 w-10 text-indigo-600 mx-auto mb-3"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                <p className="text-gray-600 font-medium">
                  Menghubungkan ke Metabase...
                </p>
              </div>
            </div>
          ) : (
            <MetabaseDashboard
              iframeUrl={embedUrl}
              title="Dashboard Luas Panen Anthurium Indonesia"
            />
          )}

          {/* Interactivity Notice */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <h3 className="text-sm font-semibold text-blue-800 mb-1">
                  Peta Interaktif
                </h3>
                <p className="text-sm text-blue-700">
                  Peta di atas bersifat interaktif. Anda dapat <strong>hover</strong> (arahkan kursor)
                  pada provinsi untuk melihat detail data luas panen, serta menggunakan
                  <strong> filter bawaan Metabase</strong> yang tersedia di bagian atas dashboard
                  untuk memfilter data berdasarkan periode atau parameter lainnya.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}