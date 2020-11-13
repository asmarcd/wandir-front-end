import React from "react";
import "./style.css"

export default function Hero() {
  return (
    <div>
      <section className="hero is-medium is-bold">
        <div className="hero-body">
          <div className="container">
            <h1>Wondir</h1>
            <h2>Subtitle Here!</h2>
          </div>
        </div> <div className="field has-addons">
        <div className="control">
          <input className="input" type="text" placeholder="Find a repository" />
        </div>
        <div className="control">
          <a className="button is-warning">
            Search
          </a>
        </div>
        <br />
      </div>
      </section>
     
   
    </div>
  );
}
