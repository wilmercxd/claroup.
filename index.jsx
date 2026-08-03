import React from 'react'
import ReactDOM from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'
import ClaroUpSalesKit from './ClaroUpSalesKit'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClaroUpSalesKit />
    <Analytics />
  </React.StrictMode>,
)
