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
    place: "add a place name",
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
      setPendingMarkerState({ place: "add a place", region:null, lat:null, lng:null, });
      setEditState(!editState);
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
  const handleDelete = (id) =>{
    API.deletePoint(id).then(res=>{
    updateGeoFnc({},id)
    })
  }
  return (
    <div id="mapWindow">
      <div>
          {!editState ? <button onClick={e=>setEditState(!editState)}>Add</button> : <button onClick={handleSave}>Save</button>}
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
          attribution='&copy;contributors <a href="https://www.mapbox.com/">Mapbox</a>'
          url="https://api.mapbox.com/styles/v1/clubkemp/ck8g7dryj03yx1ilfeku3lmf0/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiY2x1YmtlbXAiLCJhIjoiY2luNmtvOXg3MDB4OHVjbHl0YjQ1bjc2dyJ9.Bj-bF_xeXkbQmC8Zf87z2A"
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
              <div>{marker.place}</div>
              {editState ? (
          <span>
            <button onClick={e=>handleDelete(marker.id)}>Delete</button>
            <button>Update</button>
          </span>
              )
              : null}
            </Popup>
          </Marker>
        ))}

        <HandleClick />
      </MapContainer>
    </div>
  );
}
