import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import Pop from "../utils/Pop.js";
import { logger } from "../utils/Logger.js";
import { AppState } from "../AppState.js";
import { eventsService } from "../services/EventsService.js";

function FilterBar() {

  let [filter, changeFilter] = useState('all');

  const userChangeFilter = event => {
    try {
      let category = event.currentTarget.getAttribute('data-category');
      logger.log(category)
      changeFilter(category);
      eventsService.changeFilter(category)
    }
    catch (error) {
      Pop.error(error);
    }
  }

  return (
    <div className="col-12 pt-3">
      <div className="row">
        <div className={"col-4 col-lg-2 d-flex justify-content-center align-items-center py-3 selectable bg-dark bg-gradient all " + (filter == 'all' ? 'border-bottom border-purple border-3' : '')} data-category="all" onClick={userChangeFilter}>
          <span className="fs-5 text-shadow">
            All
          </span>
        </div>
        <div className={"col-4 col-lg-2 d-flex justify-content-center align-items-center py-3 selectable bg-dark bg-gradient " + (filter == 'convention' ? 'border-bottom border-purple border-3' : '')} data-category="convention" onClick={userChangeFilter}>
          <span className="fs-5 text-shadow">
            Conventions
          </span>
        </div>
        <div className={"col-4 col-lg-2 d-flex justify-content-center align-items-center py-3 selectable bg-dark bg-gradient sports " + (filter == 'sport' ? 'border-bottom border-purple border-3' : '')} data-category="sport" onClick={userChangeFilter}>
          <span className="fs-5 text-shadow">
            Sports
          </span>
        </div>
        <div className={"col-4 col-lg-2 d-flex justify-content-center align-items-center py-3 selectable bg-dark bg-gradient digital " + (filter == 'digital' ? 'border-bottom border-purple border-3' : '')} data-category="digital" onClick={userChangeFilter}>
          <span className="fs-5 text-shadow">
            Digital
          </span>
        </div>
        <div className={"col-4 col-lg-2 d-flex justify-content-center align-items-center py-3 selectable bg-dark bg-gradient " + (filter == 'concert' ? 'border-bottom border-purple border-3' : '')} data-category="concert" onClick={userChangeFilter}>
          <span className="fs-5 text-shadow">
            Concerts
          </span>
        </div>
        <div className={"col-4 col-lg-2 d-flex justify-content-center align-items-center py-3 selectable bg-dark bg-gradient other " + (filter == 'other' ? 'border-bottom border-purple border-3' : '')} data-category="other" onClick={userChangeFilter}>
          <span className="fs-5 text-shadow">
            Other
          </span>
        </div>
      </div>
    </div>
  )

}
export default observer(FilterBar)