import React, { Component } from 'react'
import "./css/IssueIndex.css"
import { Link } from 'react-router-dom';
import IssueIndex from './IssueIndex';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import axios from 'axios';
import { StickyContainer, Sticky } from 'react-sticky';


export class Sidebar extends Component {

  constructor(props) {
      super(props)
      this.state = {
      image : "",
      name : "",
      token : "",
      url: "",
      email: "",
      logged : "false",
      userId: "",    
      }
  }
  
  render() {
    return (
      <StickyContainer>
        <Link to={'/'} onClick = {() => IssueIndex.getAll()}> Home </Link>
        {this.conditionalLogin(this.state.logged)}
      </StickyContainer>
    )
  }
  
  conditionalLogin = (boolean) => {
         
      if (localStorage.getItem('logged') === "true" && boolean === "false"){
        this.setState({ image : localStorage.getItem('imageurl'),
        name: localStorage.getItem('name'), 
        token : localStorage.getItem('uid'), 
        email : localStorage.getItem('email'), 
        logged : localStorage.getItem('logged'),
        userId : localStorage.getItem('userId')})
      }
      if (boolean === "false"){
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
                <img src = {this.state.image} alt = "user" className = "perfil_image" onClick = {()=> this.alertApiKey()}/>
                <br></br>
                <p>Signed in as <strong>{this.state.name}</strong></p>
                <br></br>
                <GoogleLogout
                clientId="486935814636-taagm7nb8qn8m52urkblbd0e3llv4f88.apps.googleusercontent.com"
                buttonText="Logout"
                onLogoutSuccess={this.logout}
                onFailure={this.logout}
                >
                </GoogleLogout>
            </div>
          )
  }
  
  alertApiKey = () => {
    alert('Esta es tu API KEY: ' + localStorage.getItem('uid'))
  }
  
  logout = () => {
      
      //ahora es clear porque nadie usa localStorage, si alguien usa localStorage cambiar este clear por lo que le pertoca
      //this.props.changeLogged(false)
      localStorage.clear()
      this.setState({logged : "false"})
      
  }
  
  responseGoogle = (response) => {
    axios.get("https://issue-tracker-asw-ruby.herokuapp.com/users.json?token="+response.googleId).then(res => {
        console.log(res)
        if (res.data.length === 0){
            axios.post("https://issue-tracker-asw-ruby.herokuapp.com/users", {
                name: response.profileObj.name,
                email: response.profileObj.email,
                imageurl: response.profileObj.imageUrl,
                uid: response.profileObj.googleId
            }).then(
                axios.get("https://issue-tracker-asw-ruby.herokuapp.com/users.json?token="+response.googleId).then(res2 => {
                    this.setState({userId: res2.data[0].id})
                    localStorage.setItem('userId', res.data[0].id)
            }))
        }
        localStorage.setItem('uid', response.profileObj.googleId)
        localStorage.setItem('name', response.profileObj.name)
        localStorage.setItem('email', response.profileObj.email)
        localStorage.setItem('imageurl', response.profileObj.imageUrl)
        localStorage.setItem('logged', "true")
        if (res.data.length !== 0)
            localStorage.setItem('userId', res.data[0].id)
        this.setState({ image : response.profileObj.imageUrl,
            name: response.profileObj.name, 
            token : response.uid, 
            email : response.profileObj.email, 
            logged : "true"
        })
            this.props.changeLogged(this.state.logged,this.state.userId,this.state.token);
    })
    
  }
  
}
export default Sidebar
