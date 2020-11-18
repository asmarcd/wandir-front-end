import React from "react";
import "./style.css";
import Logo from "../../assets/logo.png";
import {Link} from 'react-router-dom'

export default function Hero(props) {
  return (
    <div>
      <section className="heroImg">
        <div className="hero-body">
          <div className="container">
            
            <img className="brandLogo" src={Logo} alt="logo" />
            
            <div className="columns" id="userMenus">
              <div className="column 4">
                <div className="field has-addons">
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      placeholder="Find a repository"
                    />
                  </div>
                  <div className="control">
                    <a className="button">Search</a>
                  </div>
                  <br />
                </div>
              </div>
              <div className="column 4">
              <div className="control is-pulled-right">
                <Link to="/">
                  <button className="button">Log Out</button>
                </Link>

                  </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
