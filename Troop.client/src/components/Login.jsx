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
    <>
      <button className="bttn bttn3 text-uppercase mt-1 mb-2" onClick={login}>Login</button>
      <Link to={""} className="bttn bttn3 text-uppercase mt-1 mb-2 d-flex align-items-center justify-content-center text-light">Home</Link>
    </>
  )

  const authenticated = (
    <div className="my-2 my-lg-0">
      <img src={AppState.account?.picture} alt="Account Picture" className="account-picture" />
    </div>
  )

  return (
    <div className="w-100 d-flex flex-column align-items-center">
      {!AppState.account?.id ? notAuthenticated : authenticated}
    </div>
  )
}

export default observer(Login)