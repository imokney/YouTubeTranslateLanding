import React from 'react'
import ReactDOM from 'react-dom/client'
import Landing from './Landing'
import './index.css'
import Lenis from '@studio-freight/lenis'
import { injectSpeedInsights } from '@vercel/speed-insights'

injectSpeedInsights()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Landing />
  </React.StrictMode>,
)

