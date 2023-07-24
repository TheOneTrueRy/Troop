import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import Pop from "../utils/Pop.js";
import { logger } from "../utils/Logger.js";

function FilterBar() {

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
  )

}
export default observer(FilterBar)