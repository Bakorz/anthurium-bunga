import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

// ============================================================
// Entry Point (main.jsx)
// --------------------------------------------------------
// BrowserRouter wraps the entire application so we can use
// React Router's <Link> and <Routes> anywhere in the tree.
// StrictMode helps catch common bugs during development.
// ============================================================
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)