import React, {useState, useContext, useEffect} from "react";
import "./style.css";
import Logo from "../../assets/logo_2.png";
import forest from "../../assets/forest.mov"
import {Link} from 'react-router-dom'
import API from "../../utils/API";
import GeoStateContext from "../../contexts/GeoStateContext";

export default function Hero(props) {
  const { userState } = useContext(GeoStateContext)


  const [searchState, setSearchState] =useState({
    searchInput:"",
    triggered:false
  })

  function handleInput(event){
    const name =event.target.name
    const value = event.target.value
    setSearchState({
      ...searchState,
      [name]:value
    });
  }

  function handleClick(){
    props.handleSearch(searchState.searchInput)
    setSearchState({
      searchInput:"",
      triggered:!searchState.triggered,
    })
  }

  return (
    <div>
      <section className="heroImg"> 
        <div className="hero-body">
          <div className="container">
            
            <img className="brandLogo" src={Logo} alt="logo" />
            <div className="columns is-mobile" id="userMenus">
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
                  <div className="control" >
                    <a className="button searchBtn" onClick={handleClick}>Search</a>
                  </div>
                  <br />
                </div>
              </div>
              <div className="column 4">
              <div className=" is-pulled-right is-pulled-left-mobile">
                <Link to="/">
                
                  <button className="button" onClick={props.handleLogout}>{userState.isLoggedIn?"Log Out":"Log in"}</button>
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
