import React, { useContext, useState, useEffect } from "react";
import "./style.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  Tooltip,
} from "react-leaflet";
import GeoStateContext from "../../contexts/GeoStateContext";

export default function Map() {
  const { geoState } = useContext(GeoStateContext);
  
  const [editState, setEditState] = useState({
    active: false,
    title: null,
  });
  const [pendingMarkerState, setPendingMarkerState] = useState({
    title: null,
    position: null,
  });
  const [markersState, setMarkersState] = useState([
    {
      id: 1,
      lat: 47.6804733,
      lng: -122.3281708,
      place: "Green Lake",
      region: "seattle",
    },
  ]);
  const [position, setPosition] = useState(null);

  const openPopup = (marker) => {
    if (marker) {
      window.setTimeout(() => {
        marker.openPopup();
      });
    }
  };

  useEffect(() => {
    // setMarkersState(props.geo);
  }, []);

  function HandleClick() {
    const map = useMapEvents({
      click(e) {
        setPendingMarkerState({
          ...pendingMarkerState,
          position: { lat: e.latlng.lat, lng: e.latlng.lng },
        });
      },
    });

    if (editState.active && pendingMarkerState.position != null) {
      return (
        <Marker
          className="pending-marker"
          position={pendingMarkerState.position}
          ref={openPopup}
        >
          <Popup>
            <p>{pendingMarkerState.title}</p>
            <button onClick={handleSave}>save</button>
          </Popup>
        </Marker>
      );
    } else {
      return null;
    }
  }
  const handleSave = () => {
    console.log(pendingMarkerState);
    const currentMarkers = markersState;
    currentMarkers.push(pendingMarkerState);
    setMarkersState(currentMarkers);
    setPendingMarkerState({ title: null, position: null });
    setEditState({ active: !editState.active });
  };
  const handleTextInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPendingMarkerState({
      ...pendingMarkerState,
      [name]: value,
    });
  };
  const plotPoints = () => {};
  return (
    <div id="mapWindow">
      <div>
        <button onClick={(e) => setEditState({ active: !editState.active })}>
          Edit
        </button>
        {editState.active ? (
          <input
            name="title"
            id="markerInput"
            value={pendingMarkerState.title}
            onChange={handleTextInput}
          />
        ) : null}
      </div>
      <MapContainer
        className={
          editState.active
            ? "leaflet-container edit-active"
            : "leaflet-container"
        }
        center={[47.636131, -122.341518]}
        zoom={11}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {geoState.map((marker, idx) => (
          <Marker
            key={`marker-${marker.id}`}
            position={{
              lat: marker.lat,
              lng: marker.lng,
            }}
          >
            <Popup>
              <span>{marker.place}</span>
            </Popup>
          </Marker>
        ))}

        <HandleClick />
      </MapContainer>
    </div>
  );
}
