import React, { useContext, useState, useEffect, useMemo, useRef } from "react";
import "./style.css";
import Geolocate from "../Geolocate"
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  Tooltip,
} from "react-leaflet";
import GeoStateContext from "../../contexts/GeoStateContext";
import API from "../../utils/API";

export default function Map() {
  // This reference stores infor for the pending marker on page so we can perform actions in pendingMarkerEventHandlers
  const markerRef = useRef(null);

  // Pull in the context data from app. geodata, user data(for id), and functions to send updated back up
  const { geoState, userState, handleFilterContent } = useContext(
    GeoStateContext
  );
  
  // Turns on the functionality to be editing the map
  const [editState, setEditState] = useState(false);

  //The state for the pending marker sent as data upon save
  const [pendingMarkerState, setPendingMarkerState] = useState({
    place: "",
    region: null,
    lat: null,
    lng: null,
  });

  const [geolocateState, setGeolocateState] =useState(false)

  
  // This is one of two click handlers in this component
  // This one listens for just any old click on the map
  const HandleClick = () => {
    // leaflet boilerplate to listen to the map events
    const map = useMapEvents({
      click(e) {
        // upon the map click you get the target e which contains the info on the spot clicked
        // so if the user is clicking around on the map, they are probably editing so set the pending marker
        
        setPendingMarkerState({
          ...pendingMarkerState,
          lat: e.latlng.lat,
          lng: e.latlng.lng,
          UserId: userState.id,
        });
        // if a point on the map is clicked, we are probably trying to get back out of a marker clicked on
        // so go ahead and send the call up to get all the data again
        // TODO:Move this to popup on close?
      },
    });
    // SO given the above, we need to check to see if the user actually had edit actived
    // And if the pending marker state has data in it
    if (editState && pendingMarkerState.lat != null) {
      // If those are true go ahead and add a leaflet marker
      return (
        <Marker
          // makes the marker draggable
          draggable={true}
          // Setup the handler for the events to this ol gal
          eventHandlers={pendingMarkerEventHandlers}
          // Not being used, but maybe could style this off it?
          className="pending-marker"
          // Set the position based on the pending marker state
          position={[pendingMarkerState.lat, pendingMarkerState.lng]}
          // use the ref to keep this marker in mind for work in eventhandler
          ref={markerRef}
        >
          {/* THe popup for this little gem */}
          <Popup >
            {pendingMarkerState.place != ""?<button onClick={handleSave}>Save</button> : null}
            <p>{pendingMarkerState.place}</p>
          </Popup>
        </Marker>
      );
    } else {
      // so if the edit session isn't active everything above is skipped and no point is added
      return null;
    }
  }
  // Events for the pending marker
  const pendingMarkerEventHandlers = {
      // on drag
      dragend() {
        console.log("dragged")
        console.log(pendingMarkerState)
        // grab the data of the marker from the ref
        const marker = markerRef.current;
        console.log("marker",marker)
        // check ot make sure that marker indeed exists
        if (marker != null) {
          // get the location of the point after drag
          const newPosition = marker.getLatLng();
          // update the pending marker state with new location
          console.log("before");
          setPendingMarkerState({
            ...pendingMarkerState,
            lat: newPosition.lat,
            lng:newPosition.lng,
            UserId: userState.id,
          });
          console.log("after")
        }
      },
      // on add
      add() {
        // if the marker is added open the popup on default
        const marker = markerRef.current;
        marker.openPopup();
      },
    }
  // on click for the save button, currently in the head of the map
  const handleSave = () => {
    if(pendingMarkerState.id){
      API.updatePoint(pendingMarkerState).then((res) => {
        // send the data we jsut put into the db to updateGEo function in app.js
        // this is just to update the state so we don't ahve to do a brand new api call
        handleFilterContent(0,"all")
        // clear out the pending marker state
        setPendingMarkerState({ place: "", region: null, lat: null, lng: null });
        // get out of edit mode
        setEditState(!editState);
      });
    }else{
      API.createPoint(pendingMarkerState).then((res) => {
        // send the data we jsut put into the db to updateGEo function in app.js
        // this is just to update the state so we don't ahve to do a brand new api call
        handleFilterContent(0,"all")
        // clear out the pending marker state
        setPendingMarkerState({ place: "", region: null, lat: null, lng: null });
        // get out of edit mode
        setEditState(!editState);
      });
    }
    console.log(pendingMarkerState)
    // create the pending marker into the DB
    
  };
  // handles the text state of the input fields for the pending marker
  // TODO: would be sweet to move te inputs into the popup, but can't get it to not refresh
  const handleTextInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPendingMarkerState({
      ...pendingMarkerState,
      [name]: value,
    });
  };

  // Function that listens to an opening of a popup, and therefore a point click
  const handlePointClick = (id) => {
    //  if a point is opened, send the id and type up to app to make an api call and update the state context
    handleFilterContent(id, "geo");
  };

  // listenes to the on click for the delete button in current markers
  const handleDelete = (id) => {
    // make the api call sending in the id
    API.deletePoint(id).then((res) => {
      // send in a request up to app to remove that geo from state and therefore the map
      handleFilterContent(0,"all")
    });
  };

  const handleUpdate =(marker) =>{
    setEditState(true)
    setPendingMarkerState(marker);

    //update pending marker with the marker info
    // remove that point from geostate
    // push the pending marker to db
  }
  // render the map elements
  return (
    // overall container
    <div id="mapWindow">
      {/* top portion where the input and edit button is contained */}
      <div>
        {/* edit state controls if it is an add or save button */}
        {!editState ? (
          <button onClick={(e) => setEditState(!editState)}>Create Place</button>
        ) : (
          <button onClick={(e) => setEditState(!editState)}>Cancel</button>
        )}
        {/* only show the input fields if in edit mode */}
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
      {/* sets if the user wants to geolocate or not */}
      <button onClick={e=>setGeolocateState(!geolocateState)}>{geolocateState ?"hide me":"Show me"}</button>
      {/* the map itself */}
      <MapContainer
        // not being used currently, but could style based on edit mode
        className={
          editState ? "leaflet-container edit-active" : "leaflet-container"
        }
        center={[47.636131, -122.341518]}
        zoom={11}
        scrollWheelZoom={false}
      >
        {/* If the user turns on geoloate, it activats the geolocate component */}
        {geolocateState ? <Geolocate /> : null}
        {/* background data for the map */}
        <TileLayer
          attribution='&copy;contributors <a href="https://www.mapbox.com/">Mapbox</a>'
          url="https://api.mapbox.com/styles/v1/clubkemp/ck8g7dryj03yx1ilfeku3lmf0/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiY2x1YmtlbXAiLCJhIjoiY2luNmtvOXg3MDB4OHVjbHl0YjQ1bjc2dyJ9.Bj-bF_xeXkbQmC8Zf87z2A"
        />
        {/* map function that adds markers based on our geostate */}
        {geoState.map((marker) => (
          <Marker

            key={`marker-${marker.id}`}
            id={marker.id}
            position={{
              lat: marker.lat,
              lng: marker.lng,
            }}
          >
            {/* the popup for each marker, notice the listener that handles our click */}
            {/* it exists here because an onclick doesn't seem to work on the marker */}
            {/* TODO: add onclose that gets out of the slection */}
            <Popup id={marker.id} onClose={e=>handleFilterContent(0, "all")} onOpen={(e) => handlePointClick(marker.id)}>
              {/* <HandlePointClick id={marker.id} /> */}
              <div>{marker.place}</div>
              {/* if edit state is actie give update and delte functionality */}
                <span>
                  <button onClick={(e) => handleDelete(marker.id)}>
                    Delete
                  </button>
                  {/* TODO: figure out how to handle a point update */}
                  <button onClick={(e)=> handleUpdate(marker)}>Update</button>
                </span>
            </Popup>
          </Marker>
        ))}

        <HandleClick />
      </MapContainer>
    </div>
  );
}
