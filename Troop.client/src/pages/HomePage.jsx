import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";

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
        <div className="col-12 pt-3">
          <div className="row rounded bg-dark bg-gradient elevation-2">
            <div className={"col-4 col-lg-2 d-flex justify-content-center align-items-center py-3 selectable all"}>
              <span className="fs-4 text-shadow">
                All
              </span>
            </div>
            <div className={"col-4 col-lg-2 d-flex justify-content-center align-items-center py-3 selectable"}>
              <span className="fs-4 text-shadow">
                Conventions
              </span>
            </div>
            <div className={"col-4 col-lg-2 d-flex justify-content-center align-items-center py-3 selectable sports"}>
              <span className="fs-4 text-shadow">
                Sports
              </span>
            </div>
            <div className={"col-4 col-lg-2 d-flex justify-content-center align-items-center py-3 selectable digital"}>
              <span className="fs-4 text-shadow">
                Digital
              </span>
            </div>
            <div className={"col-4 col-lg-2 d-flex justify-content-center align-items-center py-3 selectable"}>
              <span className="fs-4 text-shadow">
                Concerts
              </span>
            </div>
            <div className={"col-4 col-lg-2 d-flex justify-content-center align-items-center py-3 selectable other"}>
              <span className="fs-4 text-shadow">
                Other
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default observer(HomePage)