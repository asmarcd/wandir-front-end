import React from 'react'
import "./style.css"
import Textarea from "../../components/Textarea"

export default function Journal(props) {
    return (
        
        <div id="journalWindow">
           <Textarea geo={props.geo}/> 
            <article className="media">
       
        <div className="media-content">
          <div className="content">
            <p>
              <strong>Starting my Journey to the Desert</strong> 
              <br />
              <small>11/13/2020</small>
              <br />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.
            </p>
          </div>
        </div>
       
      </article>
      <br />
      <article className="media">
       
       <div className="media-content">
         <div className="content">
           <p>
             <strong>Walking...</strong> 
             <br />
             <small>11/13/2020</small> 
             <br />
             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.
           </p>
         </div>
       </div>
      
     </article>
     <br />
     <article className="media">
       
       <div className="media-content">
         <div className="content">
           <p>
             <strong>No water.. i need water</strong> 
             <br />
             <small>11/13/2020</small>
             <br />
             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.
           </p>
         </div>
       </div>
      <br />
      
     </article>
     <article className="media">
       
       <div className="media-content">
         <div className="content">
           <p>
             <strong>Yay! We made it!</strong> 
             <br />
             <small>11/13/2020</small>
             <br />
             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.
           </p>
         </div>
       </div>
      <br />
      
     </article>
        </div>
    )
}
