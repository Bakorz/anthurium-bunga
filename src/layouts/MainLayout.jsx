import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

// ============================================================
// MainLayout Component (src/layouts/MainLayout.jsx)
// --------------------------------------------------------
// Provides the shared page chrome for the entire application:
//   - A sticky <Navbar> at the top of the viewport
//   - A <main> content area that fills the remaining height
//
// TECHNICAL NOTES:
// - Uses React Router's <Outlet /> component to render the
//   matched child route's element. This is the standard
//   layout pattern for nested routes in React Router v6+.
// - The flex / min-h-screen pattern ensures the content
//   area stretches to fill the entire viewport height, which
//   is critical for the embedded Metabase iframe that needs
//   to occupy as much vertical space as possible.
// - bg-gray-50 provides a subtle off-white background
//   that contrasts with the white navbar.
// ============================================================

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* --------------------------------------------------------
          NAVBAR
          - Sticky at the top of viewport (sticky top-0)
          - z-50 ensures it stays above all other content
          -------------------------------------------------------- */}
      <Navbar />

      {/* --------------------------------------------------------
          MAIN CONTENT AREA
          - flex-1 makes it fill remaining vertical space
          - <Outlet /> renders the current route's page component
          - Overflow-y-auto allows long content to scroll within
            the main area without affecting the sticky navbar
          -------------------------------------------------------- */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>

      {/* --------------------------------------------------------
          FOOTER
          - Simple acknowledgment footer at the bottom of the page
          -------------------------------------------------------- */}
      <footer className="bg-white border-t border-gray-200 py-4 px-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} WSIG &mdash; Web Spatial Information System
      </footer>
    </div>
  )
}