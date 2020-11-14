import React, { useContext } from "react";
import "./style.css";
import GeoStateContext from "../../contexts/GeoStateContext";
import JournalComponent from "../../components/JournalComponent";

export default function Journal() {
  const { journalEntries } = useContext(GeoStateContext);
  return (
    <div id="journalWindow">
      {journalEntries.map((entry,i)=>(<JournalComponent key={i} {...entry} />))}
      
      {/* <article className="media">
        <div className="media-content">
          <div className="content">
            <p>
              <strong>Starting my Journey to the Desert</strong>
              <br />
              <small>11/13/2020</small>
              <br />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
              ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas
              non massa sem. Etiam finibus odio quis feugiat facilisis.
            </p>
          </div>
        </div>
      </article>
      <br />
      <article className="media">
        <div className="media-content">
          <div className="content">
            <p>
              <strong>Walking...</strong>
              <br />
              <small>11/13/2020</small>
              <br />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
              ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas
              non massa sem. Etiam finibus odio quis feugiat facilisis.
            </p>
          </div>
        </div>
      </article>
      <br />
      <article className="media">
        <div className="media-content">
          <div className="content">
            <p>
              <strong>No water.. i need water</strong>
              <br />
              <small>11/13/2020</small>
              <br />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
              ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas
              non massa sem. Etiam finibus odio quis feugiat facilisis.
            </p>
          </div>
        </div>
        <br />
      </article>
      <article className="media">
        <div className="media-content">
          <div className="content">
            <p>
              <strong>Yay! We made it!</strong>
              <br />
              <small>11/13/2020</small>
              <br />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
              ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas
              non massa sem. Etiam finibus odio quis feugiat facilisis.
            </p>
          </div>
        </div>
        <br />
      </article> */}
    </div>
  );
}
