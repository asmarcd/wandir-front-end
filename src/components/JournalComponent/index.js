import React, { useState } from "react";
import "./style.css";

// function expand(){
// var coll = document.getElementsByClassName("collapsible");
// var i;

// for (i = 0; i < coll.length; i++) {
//   coll[i].addEventListener("click", function() {
//     this.classList.toggle("active");
//     var content = this.nextElementSibling;
//     if (content.style.maxHeight){
//       content.style.maxHeight = null;
//     } else {
//       content.style.maxHeight = content.scrollHeight + "px";
//     }
//   });
// }
// }

export default function JournalComponent({ id, title, date, body, ...rest }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <article className="media" {...rest}>
      <div className="media-content">
        <button className="collapsible" onClick={() => setIsOpen(!isOpen)}>
          <strong>{title}</strong>
          <small>{date}</small>
        </button>

        {isOpen && (
          <div className="content">
            <p>
              {body}
              <div className="entryMenu">
                <button className="entryEdit">Edit</button>
                <button className="entryDelete">Delete</button>
              </div>
            </p>
          </div>
        )}
      </div>
    </article>

    // <article className="media" {...rest}>
    //     <div className="media-content">
    //       <button className="collapsible" onClick={expand}><strong>{title}</strong> <small>{date}</small></button>
    //       <div className="content">
    //         <p>
    //           {body}
    //         </p>
    //       </div>
    //     </div>
    //   </article>
    // );
  );
}
