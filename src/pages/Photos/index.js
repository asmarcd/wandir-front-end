import React from "react";
import "./style.css";
import "lightbox2/dist/css/lightbox.min.css";
import "lightbox2/dist/js/lightbox-plus-jquery.min.js";
import "react-bulma-components/dist/react-bulma-components.min.css";
import PhotoComponent from "../../components/PhotoComponent";

export default function Photos() {
  return (
    <div id="photoWindow">
      <div id="gallery">
        <div class="columns is-multiline is-mobile">
        
        {/* Image template */}
        <PhotoComponent />
        


        </div>
        
      </div>
    </div>
  );
}
