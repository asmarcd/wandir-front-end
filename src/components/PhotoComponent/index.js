import React from "react";
import PhotoModal from "../PhotoModal";
import "./style.css";

export default function PhotoComponent({ id, url, entryId, geoId, ...rest }) {
  return (
    <div className="thumbnail column is-4" {...rest}>
      <a
        className="example-image-link"
        href={url}
        data-lightbox="example-set"
        data-title="The next image in the set is preloaded as you're viewing."
      >
        <figure className="image is-square">
          <img className="example-image" src={url} alt="" />
        </figure>
      </a>

      {/* <button className="editText" >Edit</button> */}
      <PhotoModal />
    </div>
  );
}
