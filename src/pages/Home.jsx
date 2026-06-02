// ============================================================
// Home Page (src/pages/Home.jsx)
// --------------------------------------------------------
// The landing page of the WSIG application.
// Provides an overview of the application and a call-to-action
// button that navigates to the Map Dashboard.
//
// This page serves as the "Beranda" (Home) route at "/".
// It uses simple Tailwind utility classes for a clean,
// centered layout with:
//   - A hero section with title and description
//   - Feature cards explaining the app's capabilities
//   - A CTA button linking to the dashboard
// ============================================================

import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      {/* --------------------------------------------------------
          HERO SECTION
          A centered hero with a title, subtitle, and CTA button.
          -------------------------------------------------------- */}
      <div className="text-center mb-12">
        {/* Map pin icon */}
        <div className="flex justify-center mb-4">
          <svg
            className="w-16 h-16 text-indigo-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Web Spatial Information System
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          Sistem informasi geospasial berbasis web untuk memvisualisasikan
          data luas panen Anthurium di Indonesia melalui peta choropleth
          interaktif yang terintegrasi dengan Metabase.
        </p>

        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
          Lihat Dashboard
        </Link>
      </div>

      {/* --------------------------------------------------------
          FEATURE CARDS
          Three cards describing the key features of the application.
          -------------------------------------------------------- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Feature 1: Choropleth Map */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Peta Choropleth
          </h3>
          <p className="text-gray-600 text-sm">
            Visualisasi data luas panen Anthurium per provinsi di Indonesia
            menggunakan peta choropleth interaktif.
          </p>
        </div>

        {/* Feature 2: Metabase Integration */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Embedding Aman
          </h3>
          <p className="text-gray-600 text-sm">
            Dashboard Metabase di-embed secara aman menggunakan JWT token
            sehingga data tetap terlindungi.
          </p>
        </div>

        {/* Feature 3: Interactive */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeLinejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.698 7.34l-2.897-.777M7.188 2.239L6.49 4.93m1.698-2.691L5.698 7.34m0 0l-.777 2.897M3.804 9.923l2.897-.777M3.804 9.923l-2.897.777" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Interaktif
          </h3>
          <p className="text-gray-600 text-sm">
            Hover pada provinsi untuk melihat detail data, gunakan filter
            bawaan Metabase untuk eksplorasi data lebih mendalam.
          </p>
        </div>
      </div>
    </div>
  )
}