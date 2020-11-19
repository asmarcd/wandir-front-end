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
  const [activeJournal, setActiveJournal] = useState()

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
  const handleActive = id =>{
    console.log(id)
  }

  return (
    <div id="journalWindow">
      <div id="postArea">
        {editState ? <Button className="jrnBtn" onClick={handleClick}>Cancel</Button> : <Button className="jrnBtn" onClick={handleClick}>Add</Button>}
        {editState ? <TextArea handleClick={handleClick} /> : journalEntries.map((entry, i) => (<JournalComponent handleActive={handleActive}key={i} editClick={editClick} {...entry} />))}
      </div>


    </div>
  );
}
