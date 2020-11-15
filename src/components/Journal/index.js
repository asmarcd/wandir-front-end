import React, { useContext, useState } from "react";
import "./style.css";
import GeoStateContext from "../../contexts/GeoStateContext";
import JournalComponent from "../JournalComponent";
import TextArea from "../Textarea";
import {Button} from 'react-bulma-components'

export default function Journal() {
  const { journalEntries } = useContext(GeoStateContext);
  
  const [ editState, setEdit] = useState(false)
  
  const handleClick =() =>{
    // setup logic here to save to DB on save
    setEdit(!editState)
  }
  return (
    <div id="journalWindow">
      <div id="postArea">
        {editState?<Button onClick={handleClick}>Cancel</Button>:<Button onClick={handleClick}>Add</Button>}
        {editState?<TextArea /> : journalEntries.map((entry,i)=>(<JournalComponent key={i} {...entry} />)) }
      </div>
      
      
    </div>
  );
}
