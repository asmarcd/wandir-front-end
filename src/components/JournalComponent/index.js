import React, { useState, useContext, useEffect } from "react";
import "./style.css";
import ReactMarkdown from 'react-markdown'
import GeoStateContext from "../../contexts/GeoStateContext";
import API from "../../utils/API"



export default function JournalComponent({ id, title, date, body, editClick, active, ...rest }) {
  const { deleteReset, handleFilterContent } = useContext(GeoStateContext)

  const [isOpen, setIsOpen] = useState(false);
  
  const deleteClick = id => {
    const deletedId = id;
    API.deleteEntry(id).then(res => {
      if (deletedId !== res) {
        deleteReset();
        setIsOpen(!isOpen)
      }
    });
  };
  const handleClick = (id) =>{
    setIsOpen(!isOpen)
    handleFilterContent(id, "entry", isOpen)
    console.log(active)

  }
  const handleLink = () => {
    // TODO:Some way to return the name or id of hte markdown link?
  }

  return (
    <article className="media" {...rest}>
      <div className="media-content">
        <button className="collapsible" onClick={() =>handleClick(id) }>
          <strong>{title}</strong> <small>{date}</small>
        </button>

        {isOpen && (
          <div className="content">
            <p>
              <ReactMarkdown children={body} transformLinkUri={handleLink} />
              <div className="entryMenu">
                <button className="entryEdit" onClick={e => editClick(id)}>Edit</button>
                <button className="entryDelete" onClick={e => deleteClick(id)}>Delete</button>
              </div>
            </p>
          </div>
        )}
      </div>
    </article>
  );
}
