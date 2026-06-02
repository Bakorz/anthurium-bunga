import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

// ============================================================
// Navbar Component (src/components/Navbar.jsx)
// --------------------------------------------------------
// A responsive top navigation bar for the WSIG application.
//
// DESIGN DECISIONS:
// - Uses a mobile "hamburger" menu that toggles a slide-down
//   navigation panel on small screens (hamburger pattern).
// - On desktop (md+ breakpoints), the links are displayed inline.
// - The active route is highlighted using useLocation() from
//   React Router to compare the current pathname.
// - Tailwind utility classes handle all responsive breakpoints,
//   spacing, colors, and transitions.
//
// NAVIGATION LINKS:
// - "Beranda"  -> Home page (/)
// - "Dashboard" -> Map dashboard page (/dashboard)
//
// The brand title "WSIG" uses the indigo-600 accent color
// consistent with the rest of the application theme.
// ============================================================

// Define navigation items as a constant so we can map over them
const NAV_ITEMS = [
  { label: 'Beranda', path: '/' },
  { label: 'Dashboard', path: '/dashboard' },
]

export default function Navbar() {
  // Track whether the mobile menu is open or closed
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // useLocation gives us the current URL path so we can
  // highlight the active navigation item
  const location = useLocation()

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      {/* --------------------------------------------------------
          INNER CONTAINER
          - max-w-7xl constrains width on ultra-wide screens
          - mx-auto centers the container horizontally
          - px-4 sm:px-6 lg:px-8 provides responsive padding
          -------------------------------------------------------- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* ------------------------------------------------
              BRAND / LOGO
              - Link component from React Router ensures
                client-side navigation without full page reload
              ------------------------------------------------ */}
          <Link to="/" className="flex items-center gap-2">
            {/* Simple SVG icon representing a map/location pin */}
            <svg
              className="w-7 h-7 text-indigo-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
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
            <span className="text-xl font-bold text-indigo-600">
              WSIG
            </span>
          </Link>

          {/* ------------------------------------------------
              DESKTOP NAVIGATION LINKS
              - Hidden on mobile (hidden md:flex)
              - Each link uses React Router's <Link> for SPA
                navigation without page refresh
              - Active link gets indigo color, others are gray
              ------------------------------------------------ */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              // Determine if this link matches the current route
              const isActive = location.pathname === item.path

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    px-3 py-2 rounded-md text-sm font-medium transition-colors
                    ${
                      isActive
                        ? 'bg-indigo-100 text-indigo-700'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }
                  `}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>

          {/* ------------------------------------------------
              MOBILE HAMBURGER BUTTON
              - Visible only on screens smaller than md (flex md:hidden)
              - onClick toggles the mobile menu state
              - Bars icon transforms into X when menu is open
              ------------------------------------------------ */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              // X (close) icon when menu is open
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // Hamburger icon when menu is closed
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* --------------------------------------------------------
          MOBILE MENU DROPDOWN
          - Conditionally rendered based on mobileMenuOpen state
          - Appears below the navbar with a smooth border-top
          - Same navigation links as desktop, but stacked vertically
          -------------------------------------------------------- */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {NAV_ITEMS.map((item) => {
              const isActive = location.pathname === item.path

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    block px-3 py-2 rounded-md text-base font-medium transition-colors
                    ${
                      isActive
                        ? 'bg-indigo-100 text-indigo-700'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }
                  `}
                  // Close mobile menu after clicking a link
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </nav>
  )
}