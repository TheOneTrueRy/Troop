import { observer } from "mobx-react-lite"
import React from "react"
import { Link } from "react-router-dom"
import { AppState } from "../AppState.js"
import { AuthService } from "../services/AuthService.js"

function Login() {

  function login() {
    AuthService.loginWithRedirect()
  }

  function logout() {
    localStorage.removeItem('user-token')
    AuthService.logout({ returnTo: window.location.origin })
  }

  const notAuthenticated = (
    <div className="w-100 d-flex align-items-center flex-column">
      <button className="bttn bttn3 text-uppercase mt-3" onClick={login}>Login</button>
      <Link to={""} className="bttn bttn3 text-uppercase mt-3 mb-2 d-flex align-items-center justify-content-center text-light">Home</Link>
    </div>
  )

  const authenticated = (
    <div className="mt-2 my-lg-0 w-100 d-flex align-items-center flex-column">
      <Link to={"account"} title="Visit your Account page." data-bs-toggle="collapse" data-bs-target="#navbarText" className="d-lg-none">
        <img src={AppState.account?.picture} alt="Account Picture" className="account-picture selectable" />
      </Link>
      <Link to={"account"} title="Visit your Account page." className="d-none d-lg-block">
        <img src={AppState.account?.picture} alt="Account Picture" className="account-picture selectable" />
      </Link>
      <Link to={""} className="bttn bttn3 text-uppercase mt-3 d-flex d-lg-none align-items-center justify-content-center text-light" title="Visit the Home page.">
        <div data-bs-toggle="collapse" data-bs-target="#navbarText" className="h-100 w-100 d-flex align-items-center justify-content-center">
          Home
        </div>
      </Link>
      <Link to={""} className="bttn bttn3 text-uppercase mt-3 d-none d-lg-flex align-items-center justify-content-center text-light" title="Visit the Home page.">
        Home
      </Link>
      <Link to={"account"} className="bttn bttn3 text-uppercase mt-3 d-flex d-lg-none align-items-center justify-content-center text-light" title="Visit your Account page.">
        <div data-bs-toggle="collapse" data-bs-target="#navbarText" className="h-100 w-100 d-flex align-items-center justify-content-center">
          Account
        </div>
      </Link>
      <Link to={"account"} className="bttn bttn3 text-uppercase mt-3 d-none d-lg-flex align-items-center justify-content-center text-light" title="Visit your Account page.">
        Account
      </Link>
      <button className="bttn bttn3 text-uppercase mt-3 d-flex align-items-center justify-content-center text-light px-0" title="Open the Event Creation form." data-bs-toggle="modal" data-bs-target="#createEventModal">
        New Event
      </button>
      <button onClick={logout} className="bttn bttn3 text-uppercase mt-3 mb-2 d-flex align-items-center justify-content-center text-light">
        Logout
      </button>
    </div>
  )

  return (
    <div className="w-100">
      {!AppState.account?.id ? notAuthenticated : authenticated}
    </div>
  )
}

export default observer(Login)