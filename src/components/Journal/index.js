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
    console.log(`handleclick`)
    setEdit(!editState);
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
        {editState ? <Button onClick={handleClick}>Cancel</Button> : <Button onClick={handleClick}>Add</Button>}
        {editState ? <TextArea handleClick={handleClick} /> : journalEntries.map((entry, i) => (<JournalComponent key={i} editClick={editClick} {...entry} />))}
      </div>


    </div>
  );
}
