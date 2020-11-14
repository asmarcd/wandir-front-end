import React, { useContext } from "react";
import "./style.css";
import GeoStateContext from "../../contexts/GeoStateContext";
import JournalComponent from "../JournalComponent";
import TextArea from "../Textarea"

export default function Journal() {
  const { journalEntries } = useContext(GeoStateContext);
  return (
    <div id="journalWindow">
      <TextArea />
      {journalEntries.map((entry,i)=>(<JournalComponent key={i} {...entry} />))}
      
      
    </div>
  );
}
