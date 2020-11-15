import React, { useContext, useState, useEffect, useMemo, useRef } from "react";
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
import API from "../../utils/API"

export default function Map() {
  const markerRef = useRef(null)
  
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker != null) {
          const newPosition = marker.getLatLng()
          setPendingMarkerState({
          ...pendingMarkerState,
          lat:newPosition.lat,
          lng: newPosition.lng,
          UserId:userState.id
        });
      }
      },
      add(){
        const marker = markerRef.current
        marker.openPopup()
      }
    }),
    
    [],
  )
  
  const { geoState, userState, updateGeoFnc } = useContext(GeoStateContext);
  // const { userState } = useContext(GeoStateContext);
  // const { updateGeo } =
  
  const [editState, setEditState] = useState(false);

  const [pendingMarkerState, setPendingMarkerState] = useState({
    place: null,
    region:null,
    lat:null,
    lng:null,
  });
  const [position, setPosition] = useState(null);

  const openPopup = (marker) => {
    console.log(marker)
    if (marker) {
      window.setTimeout(() => {
        marker.openPopup();
      });
    }
  };

  useEffect(() => {
    // setMarkersState(props.geo);
  }, [pendingMarkerState, markerRef]);

  function HandleClick() {
    const map = useMapEvents({
      click(e) {
        setPendingMarkerState({
          ...pendingMarkerState,
          lat:e.latlng.lat,
          lng: e.latlng.lng,
          UserId:userState.id
        });
      },
    });

    if (editState && pendingMarkerState.lat != null) {
      return (
        <Marker
          draggable={true}
          eventHandlers={eventHandlers}
          className="pending-marker"
          position={[pendingMarkerState.lat, pendingMarkerState.lng]}
          ref={markerRef}
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
    API.createPoint(pendingMarkerState).then(res=>{
      updateGeoFnc(res)
      setPendingMarkerState({ place: null, region:null, lat:null, lng:null, });
      setEditState(!editState.active);
    }
    )
    
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
