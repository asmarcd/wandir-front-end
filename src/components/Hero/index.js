import React from "react";
import "./style.css";
import Logo from "../../assets/logo.png";

export default function Hero() {
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
                    <a className="button is-warning ">Search</a>
                  </div>
                  <br />
                </div>
              </div>
             
        <div className="columns is-mobile is-centered"> 
          <div className="column is-4"> 
            <div className="has-text-centered"> 
              <button className="button is-warning" id="btn"> 
                Login
              </button> 
            </div> 
            <div className="modal"> 
              <div className="modal-background" /> 
              <div className="modal-content"> 
                <div className="box"> 
                  <div> 
                    <h1 className="title has-text-centered"> 
                      Login 
                    </h1> 
                  </div> 
                  <form action="#" method="post"> 
                    <div className="field"> 
                      <label className="label" id="username"> 
                        Email
                      </label> 
                      <div className="control has-icons-left"> 
                        <input className="input" type="text" htmlFor="username" placeholder="Username" /> 
                        <span className="icon is-small is-left"> 
                          <i className="fas fa-user" /> 
                        </span> 
                      </div> 
                    </div> 
                    <div className="field"> 
                      <label className="label" id="password"> 
                        Password 
                      </label> 
                      <div className="control has-icons-left"> 
                        <input className="input" type="password" htmlFor="password" placeholder="Password" /> 
                        <span className="icon is-small is-left"> 
                          <i className="fas fa-lock" /> 
                        </span> 
                      </div> 
                      <div className="buttons"> 
                        <button className="button is-link"> 
                          Login 
                        </button> 
                      </div> 
                    </div> 
                  </form> 
                </div> 
              </div> 
              <button className="modal-close is-large" aria-label="close"> 
                Model 
              </button> 
            </div> 
          </div> 
        </div> 
      </div>
                  </div>
              </div>
            
          
      </section>
    </div>
  );
}
    // Bulma does not have JavaScript included, 
    // hence custom JavaScript has to be 
    // written to open or close the modal 



