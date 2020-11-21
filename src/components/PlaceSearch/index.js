import React, {useState, useContext} from 'react'
import API from "../../utils/API";
import {useMap, Marker, Popup} from "react-leaflet"
import "./style.css";
import GeoStateContext from "../../contexts/GeoStateContext";

export default function PlaceSearch(props) {
    const { userState} = useContext(GeoStateContext)

    const [input, setInput] = useState({input:"",submit:false})
    const [markerObj, setMarkerObj] = useState()

    const handleTextInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInput({
          ...input,
          [name]: value,
        });
      };

    const handleSubmit =(event) =>{
        event.preventDefault()
        if(!input.query){
            return
        }
        API.nominationSearch(input.query).then(res=>{
            setMarkerObj({
                place: res[0].display_name.split(',')[0],
                region:res[0].address.city,
                lat: res[0].lat,
                lng: res[0].lon,
                bounds:[[res[0].boundingbox[0],res[0].boundingbox[2]],[res[0].boundingbox[1],res[0].boundingbox[3]]]
                })
        }).then(()=>{
            setInput({input:"",submit:true})
        })
    }
    const handleClick =()=>{
        console.log(markerObj)
        setInput({input:"",submit:false})
        props.handleSave({
            UserId: userState.id,
            place: markerObj.place,
            region:markerObj.region,
            lat: markerObj.lat,
            lng: markerObj.lng})
    }
    const ZoomMap = ({ marker }) =>{
        console.log(marker    )
        const map = useMap()
        map.setView([marker.lat, marker.lng])
        map.fitBounds(marker.bounds)
        return (
            <Marker
            // makes the marker draggable
            draggable={true}
            // Setup the handler for the events to this ol gal
            // Not being used, but maybe could style this off it?
            className="pending-marker"
            // Set the position based on the pending marker state
            position={[marker.lat, marker.lng]}
            // use the ref to keep this marker in mind for work in eventhandler
          >
            {/* THe popup for this little gem */}
            <Popup >
              <p>{marker.place}</p>
              {userState.isLoggedIn?(
                <span>
                <button onClick={handleClick}>Save</button>
              </span>
              ): null}
            </Popup>
          </Marker>
          )
    }
    
    return (
        <div className="search">
            {input.submit ? <ZoomMap marker={markerObj}/> : null}
            <form>
            <input name="query" value={input.query} onChange={handleTextInput}></input>
            <button type="submit" className="query" onClick={handleSubmit}>Search</button>
            </form>
            
            
        </div>
    )
}
