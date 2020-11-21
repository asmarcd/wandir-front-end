import React, {useState} from 'react'
import API from "../../utils/API";
import {useMap, ZoomMap} from "react-leaflet"
import "./style.css";

export default function PlaceSearch(props) {
    
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
        API.nominationSearch(input.query).then(res=>{
            if(res){
                console.log(res)
                setMarkerObj({
                    place: res[0].display_name.split(',')[0],
                    region:res[0].address.city,
                    lat: res[0].lat,
                    lng: res[0].lon,
                    bounds:[[res[0].boundingbox[0],res[0].boundingbox[2]],[res[0].boundingbox[1],res[0].boundingbox[3]]]
                  })
                // props.handleGeoSearch(markerObj)
            }
        }).then(()=>{
            setInput({...input,submit:true})
        })
    }

    const ZoomMap = (props) =>{
        console.log(props.marker    )
        const map = useMap()
        map.setView([props.marker.lat, props.marker.lng])
        map.fitBounds(props.marker.bounds)
        return <div></div>
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
