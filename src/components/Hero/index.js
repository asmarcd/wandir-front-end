import React, {useState, useContext, useEffect} from "react";
import "./style.css";
import Logo from "../../assets/logo_2.png";

import {Link} from 'react-router-dom'
import API from "../../utils/API";
import GeoStateContext from "../../contexts/GeoStateContext";

export default function Hero(props) {

  const { fireRefresh } = useContext(GeoStateContext);

  const [searchState, setSearchState] =useState({
    searchInput:"",
    triggered:false
  })
  useEffect(() => {
    fireRefresh()
  }, [searchState.triggered])

  function handleInput(event){
    const name =event.target.name
    const value = event.target.value
    setSearchState({
      ...searchState,
      triggered:!searchState.triggered,
      [name]:value
    });
  }

  function handleClick(){
    props.handleSearch(searchState.searchInput)

  }

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
                      name="searchInput"
                      value={searchState.searchInput}
                      onChange={handleInput}
                    />
                  </div>
                  <div className="control">
                    <a className="button" onClick={handleClick}>Search</a>
                  </div>
                  <br />
                </div>
              </div>
              <div className="column 4">
              <div className="control is-pulled-right">
                <Link to="/">
                  <button className="button" onClick={props.handleLogout}>Log Out</button>
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
