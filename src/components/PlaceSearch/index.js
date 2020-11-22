import React, {useState, useContext} from 'react'
import API from "../../utils/API";
import {useMap, Marker, Popup} from "react-leaflet"
import "./style.css";
import GeoStateContext from "../../contexts/GeoStateContext";

export default function PlaceSearch(props) {
    // get the latest user state
    const { userState} = useContext(GeoStateContext)
    // setup state for the input and the marker that comes back from the nomination request
    const [input, setInput] = useState({input:"",submit:false})
    const [markerObj, setMarkerObj] = useState()

    // boilerplate handle input
    const handleTextInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInput({
          ...input,
          [name]: value,
        });
      };
    
    // on hitting the search button
    const handleSubmit =(event) =>{
        event.preventDefault()
        // break out if the user didn't actually enter a query
        if(!input.query){
            return
        }
        // otherwise go ahead and use the input query against the OSM nomination geolocator
        API.nominationSearch(input.query).then(res=>{
            // set state to the object
            setMarkerObj({
                // grab only the beginning of the place name
                place: res[0].display_name.split(',')[0],
                region:res[0].address.city,
                lat: res[0].lat,
                lng: res[0].lon,
                // grab the bounds so that you have the right zoom level
                bounds:[[res[0].boundingbox[0],res[0].boundingbox[2]],[res[0].boundingbox[1],res[0].boundingbox[3]]]
                })
        }).then(()=>{
            // reset the input and change submit so the zoomMap component can turn on
            setInput({input:"",submit:true})
        })
    }
    // handles the Save button click
    const handleClick =()=>{
        // clear the input fo the geosearch and reste the submit state
        setInput({input:"",submit:false})
        // fire the handle save function up a level in the map component
        props.handleSave({
            UserId: userState.id,
            place: markerObj.place,
            region:markerObj.region,
            lat: markerObj.lat,
            lng: markerObj.lng})
    }
    // does work to zoom the map and creates the marker
    const ZoomMap = ({ marker }) =>{
        // use the map variable out of leaflet
        const map = useMap()
        // set he view, an the bounds(zoom) based on the marker
        map.setView([marker.lat, marker.lng])
        map.fitBounds(marker.bounds)
        // plot the marker
        return (
            <Marker
            // makes the marker not draggable
            draggable={false}
            // Setup the handler for the events to this ol gal
            // Not being used, but maybe could style this off it?
            className="pending-marker"
            // Set the position based on the pending marker state
            position={[marker.lat, marker.lng]}
            // use the ref to keep this marker in mind for work in eventhandler
          >
            {/* THe popup for this little gem */}
            <Popup >
              <p className="popupPlace">{marker.place}</p>
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
        // Return the actual search component for use on the map
        <div className="search">
            {/* fire up on submit */}
            {input.submit ? <ZoomMap marker={markerObj}/> : null}
            <form>
            <input name="query" value={input.query} onChange={handleTextInput}></input>
            <button type="submit" className="query" onClick={handleSubmit}>Search</button>
            </form>
            
            
        </div>
    )
}
