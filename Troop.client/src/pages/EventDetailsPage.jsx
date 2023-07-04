import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';

function EventDetailsPage() {

  useEffect(() => {
    document.title = 'Troop - Event 🎉'
  }, [])

  return (

    <div className="EventDetailsPage">

    </div>
  )

}
export default observer(EventDetailsPage)