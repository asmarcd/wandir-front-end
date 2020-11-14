import React from "react";

export default function PhotoComponent() {
  return (
    <div class="column is-4">
      <a
        class="example-image-link"
        href="http://lokeshdhakar.com/projects/lightbox2/images/image-5.jpg"
        data-lightbox="example-set"
        data-title="The next image in the set is preloaded as you're viewing."
      >
        <figure class="image is-square">
          <img
            class="example-image"
            src="http://lokeshdhakar.com/projects/lightbox2/images/image-5.jpg"
            alt=""
          />
        </figure>
      </a>
    </div>
  );
}
