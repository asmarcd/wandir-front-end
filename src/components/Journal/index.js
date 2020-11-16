import React, { useContext, useState } from "react";
import "./style.css";
import GeoStateContext from "../../contexts/GeoStateContext";
import JournalComponent from "../JournalComponent";
import TextArea from "../Textarea";
import { Button } from 'react-bulma-components'
import API from "../../utils/API";


export default function Journal() {
  const { journalEntries, handleFilterContent } = useContext(GeoStateContext);

  const [editState, setEdit] = useState(false)

  const handleClick = () => {
    // setup logic here to save to DB on save
    setEdit(!editState)
  }

  const deleteClick = id => {
    console.log("hello")
    API.deleteEntry(id).then(res => {
      console.log('hello again')
      handleFilterContent(0, "all");

    })
  };

  return (
    <div id="journalWindow">
      <div id="postArea">
        {editState ? <Button onClick={handleClick}>Cancel</Button> : <Button onClick={handleClick}>Add</Button>}
        {editState ? <TextArea /> : journalEntries.map((entry, i) => (<JournalComponent key={i} deleteClick={deleteClick} {...entry} />))}
      </div>


    </div>
  );
}
