import React from "react";
import "./style.css"



function expand(){
var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    } 
  });
}
}

export default function JournalComponent({ id, title, date, body, ...rest }) {
  return (
    <article className="media" {...rest}>
        <div className="media-content">
          <button className="collapsible" onClick={expand}><strong>{title}</strong> <small>{date}</small></button>
          <div className="content">
            <p>
              {body}
            </p>
          </div>
        </div>
      </article>  
    
  
    
    // <article className="media" {...rest}>
      //   <div className="media-content">
      //     <div className="content">
      //       <p>
      //         <strong>{title}</strong>
      //         <br />
      //         <small>{date}</small>
      //         <br />
      //         {body}
      //       </p>
      //     </div>
      //   </div>
      // </article>
  );
}
