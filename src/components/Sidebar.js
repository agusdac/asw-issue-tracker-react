import React, { Component } from 'react'
import "./css/IssueIndex.css"
import { Link } from 'react-router-dom';
import IssueIndex from './IssueIndex';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import axios from 'axios';


export class Sidebar extends Component {

  constructor(props) {
      super(props)
      this.state = {
      image : "",
      name : "",
      token : "",
      url: "",
      email: "",
      logged : "false"
          
      }
  }
  
  render() {
    return (
      <div className = "sidebar" >
        <Link to={'/'} onClick = {() => IssueIndex.getAll()}> Home </Link>
        {this.conditionalLogin(this.state.logged)}
      </div>
    )
  }
  
  conditionalLogin = (boolean) => {
      
      console.log(this.state.image)
   
      if (boolean == "false"){
        return (
            <GoogleLogin
            clientId="486935814636-taagm7nb8qn8m52urkblbd0e3llv4f88.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={this.responseGoogle}
            cookiePolicy={'single_host_origin'}/>
        )
      }
      else 
          return (
              <div>
                <img src = {this.state.image} className = "perfil_image"/>
                Signed in as <strong>{this.state.name}</strong>
                <GoogleLogout
                clientId="486935814636-taagm7nb8qn8m52urkblbd0e3llv4f88.apps.googleusercontent.com"
                buttonText="Logout"
                onLogoutSuccess={this.logout}
                >
                </GoogleLogout>
            </div>
          )
      
  }
  
  logout = () => {
      
      this.setState({logged : "false"})
      localStorage.clear()
      
  }
  
  responseGoogle = (response) => {
    console.log(response);
    localStorage.setItem('token',response.token);
    axios.get("https://issue-tracker-asw-ruby.herokuapp.com/users.json?token="+response.googleId).then(res => {
          const user = res.data[0];
          if (res.data === {}){
          }
          else{
          console.log(user)
          this.setState({ image : response.profileObj.imageUrl, name: response.profileObj.name, token : response.googleId, email : response.profileObj.email, logged : "true"})
          }
          // alert(JSON.stringify(res.data[0].votes.length))
        
    })
  }
      
}
export default Sidebar
