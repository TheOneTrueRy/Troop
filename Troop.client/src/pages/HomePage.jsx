import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import FilterBar from "../components/FilterBar.jsx";


function HomePage() {

  useEffect(() => {
    document.title = 'Troop - Home 🏠'
  }, [])

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 d-flex flex-column justify-content-center rounded elevation-1 home-header-pic">
          <span className="fs-3 text-light py-1 text-shadow">
            Get ahead of the scalpers.
          </span>
          <span className="fs-3 text-light py-1 text-shadow">
            Reserve your seats now.
          </span>
          <span className="fs-3 text-light py-1 text-shadow">
            Real events for real people.
          </span>
        </div>
      </div>
      <div className="row">
        <FilterBar />
      </div>
    </div>
  )
}

export default observer(HomePage)