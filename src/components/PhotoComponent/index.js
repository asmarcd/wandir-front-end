import React from "react";
import PhotoModal from "../PhotoModal";
import "./style.css";


export default function PhotoComponent({ id, url, entryId, geoId, ...rest }) {
  return (
    <div className="thumbnail column is-4" {...rest}>
      <a
        className="example-image-link"
        href={url}
        data-lightbox={"example-set"}
        
      >
        <figure className="image is-square">
          <img className="example-image" src={url} alt="" />
        </figure>
      </a>

      {/* <button className="editText" >Edit</button> */}
      <PhotoModal className="editText"
      id={id}
      url={url}
      entryId={entryId}
      geoId={geoId}
      />
      
    </div>
  );
}
