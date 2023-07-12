import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from './components/Navbar.jsx'


export function App() {

  return (
    <div className="App bg-dark" id="app">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-lg-11 order-2 order-lg-1 g-0">
            <main>
              <Outlet />
            </main>
          </div>
          <div className="col-12 col-lg-1 order-1 order-lg-2 g-0 vh-lg-100 sticky-top bg-dark bg-gradient">
            <Navbar />
          </div>
        </div>
      </div>

    </div>
  )
}
