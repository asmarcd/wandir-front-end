
import React, {useState} from "react";

import {
    Marker,
    Popup,
    useMapEvents,
  } from "react-leaflet";


export default function LocationMarker() {
    const [position, setPosition] = useState(null)
    console.log("click")
    const map = useMapEvents({
      locationfound(e) {
        setPosition(e.latlng)
        map.flyTo(e.latlng, 13)
      },
    })
    map.locate()
    return position === null ? null : (
      <Marker position={position}>
        <Popup>You are here</Popup>
      </Marker>
    )
  }