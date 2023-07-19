import React from "react";
import { Link } from "react-router-dom";
import Login from "./Login.jsx";

export function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark px-4 px-lg-0">
      <Link className="navbar-brand d-lg-none d-flex selectable" to={''}>
        <h1 className="mb-0">Troop 🐵</h1>
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse flex-column" id="navbarText">
        <Login />
      </div >
    </nav >
  )
}