import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from './components/Navbar.jsx'


export function App() {

  return (
    <div className="App" id="app">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-md-11 order-2 order-md-1 g-0">
            <main>
              <Outlet />
            </main>
          </div>
          <div className="col-12 col-md-1 order-1 order-md-2 g-0 vh-md-100 sticky-top bg-dark">
            <Navbar />
          </div>
        </div>
      </div>

    </div>
  )
}
