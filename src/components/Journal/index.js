import React, { useContext, useState } from "react";
import "./style.css";
import GeoStateContext from "../../contexts/GeoStateContext";
import JournalComponent from "../JournalComponent";
import TextArea from "../Textarea";
import { Button } from 'react-bulma-components'
import API, { updateEntry } from "../../utils/API"

export default function Journal() {
  const { journalEntries, editEntry, deleteReset } = useContext(GeoStateContext);

  const [editState, setEdit] = useState(false)

  const handleClick = () => {
    // setup logic here to save to DB on save
    setEdit(!editState)
    deleteReset();
  };

  const editClick = id => {
    setEdit(!editState);
    API.getEntry(id).then(res => {
      editEntry(res);
    });
  };

  return (
    <div id="journalWindow">
      <div id="postArea">
        {editState ? <Button className="cancelbtn" onClick={handleClick}>Cancel</Button> : <Button className="addbtn" onClick={handleClick}>Add</Button>}
        {editState ? <TextArea handleClick={handleClick}/> : journalEntries.map((entry, i) => (<JournalComponent key={i} editClick={editClick} {...entry} />))}
      </div>


    </div>
  );
}
