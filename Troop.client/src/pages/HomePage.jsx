import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import Pop from "../utils/Pop.js";
import { logger } from "../utils/Logger.js";

function HomePage() {

  useEffect(() => {
    document.title = 'Troop - Home 🏠'
  }, [])

  let [filter, changeFilter] = useState('All');

  const userChangeFilter = event => {
    try {
      let category = event.currentTarget.getAttribute('data-category');
      logger.log(category)
      changeFilter(category);
    }
    catch (error) {
      Pop.error(error);
    }
  }

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
          <div className="row">
            <div className={"col-4 col-lg-2 d-flex justify-content-center align-items-center py-3 selectable bg-dark bg-gradient all " + (filter == 'All' ? 'border-bottom border-purple border-3' : '')} data-category="All" onClick={userChangeFilter}>
              <span className="fs-4 text-shadow">
                All
              </span>
            </div>
            <div className={"col-4 col-lg-2 d-flex justify-content-center align-items-center py-3 selectable bg-dark bg-gradient " + (filter == 'Conventions' ? 'border-bottom border-purple border-3' : '')} data-category="Conventions" onClick={userChangeFilter}>
              <span className="fs-4 text-shadow">
                Conventions
              </span>
            </div>
            <div className={"col-4 col-lg-2 d-flex justify-content-center align-items-center py-3 selectable bg-dark bg-gradient sports " + (filter == 'Sports' ? 'border-bottom border-purple border-3' : '')} data-category="Sports" onClick={userChangeFilter}>
              <span className="fs-4 text-shadow">
                Sports
              </span>
            </div>
            <div className={"col-4 col-lg-2 d-flex justify-content-center align-items-center py-3 selectable bg-dark bg-gradient digital " + (filter == 'Digital' ? 'border-bottom border-purple border-3' : '')} data-category="Digital" onClick={userChangeFilter}>
              <span className="fs-4 text-shadow">
                Digital
              </span>
            </div>
            <div className={"col-4 col-lg-2 d-flex justify-content-center align-items-center py-3 selectable bg-dark bg-gradient " + (filter == 'Concerts' ? 'border-bottom border-purple border-3' : '')} data-category="Concerts" onClick={userChangeFilter}>
              <span className="fs-4 text-shadow">
                Concerts
              </span>
            </div>
            <div className={"col-4 col-lg-2 d-flex justify-content-center align-items-center py-3 selectable bg-dark bg-gradient other " + (filter == 'Other' ? 'border-bottom border-purple border-3' : '')} data-category="Other" onClick={userChangeFilter}>
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