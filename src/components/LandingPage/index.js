import React from "react";
import "./style.css";
import Logo from "../../assets/logo.png";

class LandingPage extends React.Component {
  constructor() {
    super();
    
    this.state = { form: "login" };
    this.toggle = {
      login: "register",
      register: "login",
    };
  }

  onSubmit(e) {
    e.preventDefault();
  }

  render() {
    return (
      <div className="LandingContainer"><img src={Logo} /> <br />
        <div
          style={{
            transform: `translate(${
              this.state.form === "login" ? 0 : 100
            }px, 0px)`,
          }}
          className="LandingForm"
        >
          <form onSubmit={this.onSubmit.bind(this)}>
            <input placeholder="Email" type="text" />
            <input placeholder="Password" type="password" />
            {this.state.form === "login" ? (
              ""
            ) : (
              <input placeholder="Re-typed password" type="password" />
            )}
            <button>Submit</button>
          </form>
        </div>
        <div
          style={{
            transform: `translate(${
              this.state.form === "login" ? 0 : -200
            }px, 0px)`,
          }}
          className="LandingButtonDiv"
        >
          <button
            onClick={() => {
              this.setState({ form: this.toggle[this.state.form] });
            }}
          >
            {this.toggle[this.state.form]}
          </button>
        </div>
      </div>
    );
  }
}
export default LandingPage