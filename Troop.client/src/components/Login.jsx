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
    AuthService.logout({})
  }

  const notAuthenticated = (
    <div className="w-100 d-flex align-items-center flex-column">
      <button className="bttn bttn3 text-uppercase mt-3" onClick={login}>Login</button>
      <Link to={""} className="bttn bttn3 text-uppercase mt-3 mb-2 d-flex align-items-center justify-content-center text-light">Home</Link>
    </div>
  )

  const authenticated = (
    <div className="mt-2 my-lg-0 w-100 d-flex align-items-center flex-column">
      <Link to={"Account"} title="Visit your Account page." data-bs-toggle="collapse" data-bs-target="#navbarText">
        <img src={AppState.account?.picture} alt="Account Picture" className="account-picture selectable" />
      </Link>
      <Link to={""} className="bttn bttn3 text-uppercase mt-3 d-flex align-items-center justify-content-center text-light" data-bs-toggle="collapse" data-bs-target="#navbarText" title="Visit the Home page.">
        Home
      </Link>
      <Link to={"Account"} className="bttn bttn3 text-uppercase mt-3 d-flex align-items-center justify-content-center text-light" data-bs-toggle="collapse" data-bs-target="#navbarText" title="Visit your Account page.">
        Account
      </Link>
      <button className="bttn bttn3 text-uppercase mt-3 d-flex align-items-center justify-content-center text-light px-0" data-bs-toggle="collapse" data-bs-target="#navbarText" title="Open the Event Creation form.">
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