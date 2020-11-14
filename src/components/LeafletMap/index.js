// import '@geoman-io/leaflet-geoman-free';
// import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Tooltip} from 'react-leaflet';
import './style.css'


function Bucket (){
  const [editState, setEditState] = useState({
    active:false,
    title:null
  })
  const [pendingMarkerState, setPendingMarkerState] =useState({
    title: null,
    position:null,
  })
  const [markersState, setMarkersState] =useState([
    {
      title: "Lake Padden",
      position:{
        lat: 48.703084,
      lng: -122.453785,
      },
      posts:[],
      photos:[]
      

    },
    {
      title: "Squalicum Park",
      position:{
        lat: 48.769541,
        lng: -122.504768
      },
      posts:[],
      photos:[]
      

    }
  ])
  const [position, setPosition] = useState(null)
  
  const openPopup = (marker) => {
    if(marker){
      window.setTimeout(() => {
        marker.openPopup()
      })
    }
    }

  // useEffect(()=>{
  //   // if(pendingMarkerState.title != null){
  //   //   const currentMarkers= markersState
  //   //   currentMarkers.push(pendingMarkerState)
  //   //   setMarkersState(currentMarkers)
  //   //   console.log(currentMarkers)
  //   // }
  // },[pendingMarkerState])
  
  function HandleClick() { 
    const map = useMapEvents({
      click(e) {
        setPendingMarkerState({...pendingMarkerState, position:{lat:e.latlng.lat, lng:e.latlng.lng}})
        
      }
    })

    if(editState.active && pendingMarkerState.position != null){
      return (
      <Marker position={pendingMarkerState.position} ref={openPopup}>
       <Popup>
        <p>{pendingMarkerState.title}</p>
         <button onClick={handleSave}>save</button>
       </Popup>
      </Marker>
      )
    }else{
      return null
    }
    
  }
  const handleSave= ()=>{
    console.log(pendingMarkerState)
    const currentMarkers= markersState
    currentMarkers.push(pendingMarkerState)
    setMarkersState(currentMarkers)
    setPendingMarkerState({title: null,
      position:null})
    setEditState({active:!editState.active})
  }
  const handleTextInput = (e) =>{
    const name = e.target.name
    const value = e.target.value
    setPendingMarkerState({
        ...pendingMarkerState,
        [name]: value
        }) 
}
    
  return(
      <div>
      <button onClick={e => setEditState({active:!editState.active})}>Edit</button>
      {editState.active? <input name="title" id="markerInput" value={pendingMarkerState.title} onChange={handleTextInput} />: null}
      <MapContainer className={editState.active ? "leaflet-container edit-active" : "leaflet-container"} center={[48.743738,-122.464943]} zoom={11} scrollWheelZoom={false} >
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {markersState.map((marker, idx) => 
              <Marker key={`marker-${idx}`} position={marker.position}>
                <Popup>
                  <span>{marker.title}</span>
                </Popup>
              </Marker>
            )}
            
        <HandleClick />
        </MapContainer>
    </div>
        
    )
}
export default Bucket