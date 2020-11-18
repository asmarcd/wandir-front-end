import React,{useContext} from "react";
import "./style.css";
import "lightbox2/dist/css/lightbox.min.css";
import "lightbox2/dist/js/lightbox-plus-jquery.min.js";
import "react-bulma-components/dist/react-bulma-components.min.css";
import PhotoComponent from '../PhotoComponent'
import GeoStateContext from '../../contexts/GeoStateContext'
import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';


export default function Photos() {
  const {photos}=useContext(GeoStateContext)
  let widget = window.cloudinary.createUploadWidget({
    cloudName: "k3m9",
    uploadPreset: "ulnivdif"},
    (error, result) => {console.log(result.info)})
  console.log(photos)
  
  
  const showWidget = (widget) => {
    widget.open()
  }

  
  return (
    <div id="photoWindow">
      <div id = 'photo-form-container'>
        <button onClick={(e)=>{showWidget(widget)}}>Add Photo</button>
      </div>
      <div id="gallery">
        <div className="columns is-multiline is-mobile">
        
        {/* Image template */}
        {photos.map((photo, i) => (<PhotoComponent key={i} {...photo}/>))}
    

        </div>
        
      </div>
    </div>
  );
}
