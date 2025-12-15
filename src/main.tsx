import React from 'react'
import ReactDOM from 'react-dom/client'
import { inject } from '@vercel/analytics'
import Landing from './Landing'
import './index.css'
import Lenis from '@studio-freight/lenis'

// Initialize Vercel Web Analytics
inject()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Landing />
  </React.StrictMode>,
)

