import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";

function HomePage() {

  useEffect(() => {
    document.title = 'Troop - Home 🏠'
  }, [])

  return (
    <div className="home-page px-4">
      <div className="row rounded elevation-1 home-header-pic">
        <div className="col-4 d-flex flex-column justify-content-center">
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
    </div>
  )
}

export default observer(HomePage)