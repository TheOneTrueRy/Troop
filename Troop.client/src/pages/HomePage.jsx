import React, { useEffect } from "react";

export default function HomePage() {

  useEffect(() => {
    document.title = 'Troop - Home 🏠'
  }, [])

  return (
    <div className="home-page">

    </div>
  )
}