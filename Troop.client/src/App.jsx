import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { Navbar } from './components/Navbar.jsx'
import Modal from "./components/Modal.jsx"
import CreateEvent from "./components/CreateEvent.jsx"


export function App() {

  return (
    <div className="App bg-dark" id="app">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-lg-10 order-2 order-lg-1">
            <div className="row">
              <div className="col-12 bg-dark bg-gradient ps-4 py-2 d-lg-flex d-none">
                <Link to={''} title="Return to Homepage." className="pointer">
                  <img src="/TroopLogo.png" alt="Troop Logo" className="troop-logo" />
                </Link>
              </div>
              <div className="col-12 px-3 mb-3 mt-1">
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
      <Modal id={'createEventModal'}>
        <CreateEvent />
      </Modal>
    </div>
  )
}
