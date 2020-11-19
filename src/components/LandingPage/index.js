import React from "react";
import "./style.css";
import Logo from "../../assets/logo_2.png";
import API from "../../utils/API";

import forest from "../../assets/forest.mov"


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
    if(this.state.form==="login"){
      API.login(userdata).then(newToken=>{
        if(!newToken){
          this.setState({form: "login", email:"", password:"" })
          alert("Incorrect username or Password")
          return
        }
        localStorage.setItem("token",newToken.token)
        this.props.fireRefresh()
        this.setState({submit:true})
      }).then(
        this.setState({form: "login",submit:false, email:"", password:"" })
      )
  
    }else if(this.state.form==="register"){
      console.log(this.state.password , this.state.passowrd2)
      if(this.state.password === this.state.password2){
        API.createUser({email:this.state.email, username:this.state.username, password:this.state.password}).then(newUser =>{
          API.login({email:this.state.email, password:this.state.password}).then(newToken=>{
            if(!newToken){
              this.setState({form: "login", email:"", password:"" })
              alert("Incorrect username or Password")
              return
            }
            localStorage.setItem("token",newToken.token)
            this.props.fireRefresh()
            this.setState({submit:true})
          }).then(
            this.setState({form: "login",submit:false, email:"", password:"" })
          )
        })
      }else{
        alert("passwords do not match")
        return
      }
      console.log("register", userdata)
    }
  }
  handleInput(e){
    const name = e.target.name;
    const value = e.target.value;
    console.log(e.target.value)
    this.setState({[name]:value})

  }
  render() {
    return (
 
    <div className="LandingContainer"> 
    <video src={forest} webkit-playsinline playsinline autoplay="autoplay"  muted defaultMuted loop> </video>
    {/* {this.state.submit?<Redirect to="/dashboard" />:null} <video className='videoTag' autoPlay loop muted>
    <source src={forest} type='video/mov' /></video> */}
      <div className="PhotoHolder">
          {/* <img className="heroImg" src={heroImg}/> */}
        

            <img className="LandingPhoto" src={Logo} />
              </div> 
        <div
          style={{
            transform: `translate(${
              this.state.form === "login" ? 0 : 100
            }px, 0px)`,
          }} 
          className="LandingForm"
        >
          <form onSubmit={this.onSubmit.bind(this)}>
          {this.state.form === "login" ? (
              ""
            ) : (
              <div>
                 <input placeholder="Username" type="text" onChange={this.handleInput.bind(this)} value={this.state.username} name="username"/>
              </div>
            )}

            <input placeholder="Email" type="text"  onChange={this.handleInput.bind(this)} value={this.state.email} name="email"/>
            <input placeholder="Password" type="password" onChange={this.handleInput.bind(this)} value={this.state.password} name="password"/>
            {this.state.form === "login" ? (
              ""
            ) : (
              <div>
                <input placeholder="Re-typed password" type="password" onChange={this.handleInput.bind(this)} value={this.state.password2} name="password2"/>
              </div>
            )}
            <button>Submit</button>
          </form>
        </div>
        <div
          style={{
            transform: `translate(${
              this.state.form === "login" ? 0 : -215
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
