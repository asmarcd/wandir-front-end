import React from "react";
import "./style.css";
import Logo from "../../assets/logo.png";
import API from "../../utils/API";
import {
  Redirect
} from "react-router-dom";


class LandingPage extends React.Component {
  constructor() {
    super();
    
    this.state = { form: "login",submit:false};
    this.toggle = {
      login: "register",
      register: "login"
    };
  }

  onSubmit(e) {
    
    e.preventDefault();
    
    const userdata ={email:this.state.email, password:this.state.password}
    API.login(userdata).then(newToken=>{
      localStorage.setItem("token",newToken.token)
      
    }).then((newToken)=>{
        this.props.fireRefresh()
        this.setState({submit:true})
    })

  }
  handleInput(e){
    const name = e.target.name;
    const value = e.target.value;
    console.log(e.target.value)
    this.setState({[name]:value})

  }
  render() {
    return (
      <div className="LandingContainer"><img src={Logo} /> <br />
      {this.state.submit?<Redirect to="/dashboard" />:null}
        <div
          style={{
            transform: `translate(${
              this.state.form === "login" ? 0 : 100
            }px, 0px)`,
          }}
          className="LandingForm"
        >
          <form onSubmit={this.onSubmit.bind(this)}>
            <input placeholder="Email" type="text"  onChange={this.handleInput.bind(this)} name="email"/>
            <input placeholder="Password" type="password" onChange={this.handleInput.bind(this)} name="password"/>
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