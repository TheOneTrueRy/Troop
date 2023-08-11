import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import FilterBar from "../components/FilterBar.jsx";
import Pop from "../utils/Pop.js";
import { eventsService } from "../services/EventsService.js";
import { AppState } from "../AppState.js";
import Event from "../components/Event.jsx";


function HomePage() {

  useEffect(() => {
    document.title = 'Troop - Home 🏠';
    getEvents();
    window.scrollTo(0, 0);
  }, [])

  async function getEvents() {
    try {
      await eventsService.getEvents();
    }
    catch (error) {
      Pop.error(error);
    }
  }

  let events = AppState.filteredEvents

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
        <div className="col-12 pt-3 g-0">
          <div className="row">
            {events.map((e) => (
              <Event event={e} key={e.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default observer(HomePage)