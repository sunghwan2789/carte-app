import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import App from './App'

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Failed to find the root element')

const root = ReactDOM.createRoot(rootElement)
root.render(
  // disable strictmode for recoil getters
  // <React.StrictMode>
  <BrowserRouter basename="/">
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </BrowserRouter>
  // </React.StrictMode>
)
