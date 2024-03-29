import React from 'react'
import ReactDOM from 'react-dom/client'
import { AuthContext } from '@/context/Auth'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthContext />
  </React.StrictMode>,
)
