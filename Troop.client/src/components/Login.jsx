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
    <button className="bttn bttn3 text-uppercase my-2" onClick={login}>Login</button>
  )

  const authenticated = (
    <div className="my-2 my-lg-0">
      <img src={AppState.account?.picture || AppState.user?.picture} alt="account photo" height="40" className="rounded selectable no-select" data-bs-toggle="dropdown"
        aria-expanded="false" />

      <div className="dropdown-menu dropdown-menu-lg-end dropdown-menu-start p-0" aria-labelledby="authDropdown">
        <div className="list-group">
          <Link to={'Account'}>
            <div className="list-group-item dropdown-item list-group-item-action">
              Manage Account
            </div>
          </Link>
          <div className="list-group-item dropdown-item list-group-item-action text-danger selectable" onClick={logout}>
            <i className="mdi mdi-logout"></i>
            logout
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="w-100 d-flex justify-content-center">
      {!AppState.account?.id ? notAuthenticated : authenticated}
    </div>
  )
}

export default observer(Login)