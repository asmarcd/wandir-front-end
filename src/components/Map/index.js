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
  
  const [editState, setEditState] = useState(false);

  const [pendingMarkerState, setPendingMarkerState] = useState({
    place: null,
    region:null,
    lat:null,
    lng:null,
  });
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
  }, [pendingMarkerState]);

  function HandleClick() {
    const map = useMapEvents({
      click(e) {
        console.log(e)
        setPendingMarkerState({
          ...pendingMarkerState,
          lat:e.latlng.lat,
          lng: e.latlng.lng
        });
      },
    });

    if (editState && pendingMarkerState.lat != null) {
      return (
        <Marker
          className="pending-marker"
          position={[pendingMarkerState.lat, pendingMarkerState.lng]}
          ref={openPopup}
        >
          <Popup>
            <p>{pendingMarkerState.place}</p>
            <button onClick={handleSave}>save</button>
          </Popup>
        </Marker>
      );
    } else {
      return null;
    }
  }
  const handleSave = () => {
    API.savePoint
    setPendingMarkerState({ place: null, region:null, lat:null, lng:null, });
    setEditState(!editState.active);
  };
  const handleTextInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPendingMarkerState({
      ...pendingMarkerState,
      [name]: value,
    });
  };
  function HandlePointClick(id) {
    console.log("click",id)
    return null
  };
  return (
    <div id="mapWindow">
      <div>
        <button onClick={(e) => setEditState(!editState)}>
          {!editState? "Add Location" :"Save"}
        </button>
        {editState ? (
          <span>
            <input
            name="place"
            id="markerInput"
            value={pendingMarkerState.place}
            onChange={handleTextInput}
            label="Place"
          />
          <input
            name="region"
            id="markerInput"
            value={pendingMarkerState.region}
            onChange={handleTextInput}
            label="Region"
          />
          </span>
          
        ) : null}
      </div>
      <MapContainer
        className={
          editState
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
              <HandlePointClick id={marker.id} />
              <span>{marker.place}</span>
            </Popup>
          </Marker>
        ))}

        <HandleClick />
      </MapContainer>
    </div>
  );
}
