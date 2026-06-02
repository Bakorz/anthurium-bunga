import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import MapDashboard from './pages/MapDashboard'

// ============================================================
// App Component (src/App.jsx)
// --------------------------------------------------------
// The root component that defines the application's routing
// structure using React Router v6+.
//
// ROUTE STRUCTURE:
// ┌─────────────────────────────────────────────────────────┐
// │  / (MainLayout)                                         │
// │  ├── Navbar (always visible)                            │
// │  ├── <Outlet />                                         │
// │  │   ├── /          → Home page                         │
// │  │   └── /dashboard → MapDashboard page                 │
// │  └── Footer (always visible)                            │
// └─────────────────────────────────────────────────────────┘
//
// DESIGN DECISIONS:
// - MainLayout is used as a layout route (no 'element' prop
//   on the parent Route — it renders via <Outlet />)
// - Actually, we use element={MainLayout} with nested Routes
//   This lets us share the same navbar and footer across
//   all pages while swapping out the inner content.
// - The "*" path catches any unmatched routes and could
//   redirect to home or show a 404 page in the future.
// ============================================================

export default function App() {
  return (
    <Routes>
      {/* --------------------------------------------------------
          LAYOUT ROUTE
          - Wraps all pages with shared Navbar + Footer
          - MainLayout uses <Outlet /> to render child routes
          -------------------------------------------------------- */}
      <Route element={<MainLayout />}>
        {/* Home page at "/" */}
        <Route path="/" element={<Home />} />

        {/* Map dashboard at "/dashboard" */}
        <Route path="/dashboard" element={<MapDashboard />} />
      </Route>
    </Routes>
  )
}