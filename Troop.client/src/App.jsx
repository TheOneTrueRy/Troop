import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from './components/Navbar.jsx'


export function App() {

  return (
    <div className="App bg-dark" id="app">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-lg-10 order-2 order-lg-1">
            <div className="row">
              <div className="col-12 bg-dark bg-gradient ps-4 pt-1 d-lg-flex d-none">
                <h1>Troop 🐵</h1>
              </div>
              <div className="col-12 px-4">
                <main>
                  <Outlet />
                </main>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-2 order-1 order-lg-2 g-0 vh-lg-70 sticky-top bg-dark bg-gradient">
            <Navbar />
          </div>
        </div>
      </div>

    </div>
  )
}
