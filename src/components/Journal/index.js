import React, { useContext, useState } from "react";
import "./style.css";
import GeoStateContext from "../../contexts/GeoStateContext";
import JournalComponent from "../JournalComponent";
import TextArea from "../Textarea";
import { Button } from 'react-bulma-components'
import API, { updateEntry } from "../../utils/API"

export default function Journal() {
  const { journalEntries,userState, editEntry, deleteReset,handleFilterContent } = useContext(GeoStateContext);

  const [editState, setEdit] = useState(false)
  const [activeJournal, setActiveJournal] = useState()

  const handleClick = () => {
    setEdit(!editState);
    deleteReset();
    handleFilterContent(userState.id, "all")
  };

  const editClick = id => {
    setEdit(!editState);
    handleFilterContent(userState.id, "all")
    API.getEntry(id).then(res => {
      editEntry(res);
    });
  };

  return (
    <div id="journalWindow">
      {editState ? <Button className="jrnBtn is-pulled-left" onClick={handleClick}>Cancel</Button> : <Button className="jrnBtn is-pulled-left" onClick={handleClick}>Add</Button>}
      <div id="postArea">
        {/* {editState ? <Button className="jrnBtn" onClick={handleClick}>Cancel</Button> : <Button className="jrnBtn" onClick={handleClick}>Add</Button>} */}
        {editState ? <TextArea handleClick={handleClick} /> : journalEntries.map((entry, i) => (<JournalComponent key={i} editClick={editClick} {...entry} />))}
      </div>


    </div>
  );
}
