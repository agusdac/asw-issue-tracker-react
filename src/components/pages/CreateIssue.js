import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

export class CreateIssue extends Component {

  state = {
    issue:{}
  }

  CreateIssue() {
    axios.post(`https://issue-tracker-asw-ruby.herokuapp.com/issues/`)
    /*.then(res => {
      const issue = res.data;
      this.setState({ issue });
    })*/
  }

  componentDidMount() {
    
  }

  render() {
    return (
      <div>
        <Link to="/">Home</Link>
        {/*
        <h1></h1>
        <p></p>
        <hr></hr>
        */}
        
        <p>Kind: </p>
        <p>Priority: </p>
        <p>Status: </p>
      </div>
    )
  }
}

export default CreateIssue
