import React,{useContext} from "react";
import "./style.css";
import "lightbox2/dist/css/lightbox.min.css";
import "lightbox2/dist/js/lightbox-plus-jquery.min.js";
import "react-bulma-components/dist/react-bulma-components.min.css";
import PhotoComponent from '../PhotoComponent'
import GeoStateContext from '../../contexts/GeoStateContext'

export default function Photos() {
  const {photos}=useContext(GeoStateContext)
  console.log(photos)
  return (
    <div id="photoWindow">
      <div id="gallery">
        <div className="columns is-multiline is-mobile">
        
        {/* Image template */}
        {photos.map((photo, i) => (<PhotoComponent key={i} {...photo}/>))}


        </div>
        
      </div>
    </div>
  );
}
