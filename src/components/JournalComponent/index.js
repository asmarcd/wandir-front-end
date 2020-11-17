import React, { useState, useContext } from "react";
import "./style.css";

export default function JournalComponent({ id, title, date, body, editClick, deleteClick, ...rest }) {
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
              {body}
              <div className="entryMenu">
                <button className="entryEdit" onClick={e=> editClick(id)}>Edit</button>
                <button className="entryDelete" onClick={e => deleteClick(id)}>Delete</button>
              </div>
            </p>
          </div>
        )}
      </div>
    </article>
  );
}
