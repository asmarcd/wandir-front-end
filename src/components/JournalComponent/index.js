import React, { useState, useContext } from "react";
import "./style.css";
import ReactMarkdown from 'react-markdown'


const handleLink =() =>{
  console.log("Hey")
}
export default function JournalComponent({ id, title, date, body, deleteClick,...rest }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <article className="media" {...rest}>
      <div className="media-content">
        <button className="collapsible" onClick={() => setIsOpen(!isOpen)}>
          <strong>{title}</strong> <small>{date}</small>
        </button>

        {isOpen && (
          <div className="content">
            <p>
            <ReactMarkdown children={body} transformLinkUri={handleLink}/>
              <div className="entryMenu">
                <button className="entryEdit">Edit</button>
                <button className="entryDelete" onClick={e => deleteClick(id)}>Delete</button>
              </div>
            </p>
          </div>
        )}
      </div>
    </article>
  );
}
