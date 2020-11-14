import React from 'react'
import "./style.css"
import LeafletMap from "../../components/LeafletMap"

export default function Map(props) {
    return (
        <div id="mapWindow">
            <LeafletMap geo={props.geo}/>
        </div>
    )
}
