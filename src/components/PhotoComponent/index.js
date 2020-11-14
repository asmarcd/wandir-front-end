import React from "react";


export default function PhotoComponent({id,url,entryId,geoId,...rest}) {

  return (
    <div className="column is-4" {...rest}>
      <a
        className="example-image-link"
        href={url}
        data-lightbox="example-set"
        data-title="The next image in the set is preloaded as you're viewing."
      >
        <figure className="image is-square">
          <img
            className="example-image"
            src={url}
            alt=""
          />
        </figure>
      </a>
    </div>
  );
}
