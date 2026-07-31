import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'  // <-- Importa BrowserRouter
import { Analytics } from '@vercel/analytics/react'
import '@fontsource-variable/inter'
import './index.css'
import './App.css'
import App from './App.jsx'
import { installTrustedTypesPolicy } from './utils/trustedTypes.js'

installTrustedTypesPolicy()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>  {/* <-- Envuelve App con BrowserRouter */}
      <App />
    </BrowserRouter>
    <Analytics />
  </StrictMode>,
)
