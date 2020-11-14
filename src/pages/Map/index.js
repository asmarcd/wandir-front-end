import React, {useContext} from 'react'
import "./style.css"
import LeafletMap from "../../components/LeafletMap"
import GeoStateContext from "../../contexts/GeoStateContext";

export default function Map(props) {
    const { geoState } = useContext(GeoStateContext);
    return (
        <div id="mapWindow">
            <LeafletMap geo={geoState}/>
        </div>
    )
}
