import React, { Component } from 'react'
import "./css/IssueIndex.css"
import { Link } from 'react-router-dom';
import IssueIndex from './IssueIndex';

export class Sidebar extends Component {

  render() {
    return (
      <div className = "sidebar" >
        <Link to={'/'} onClick = {() => IssueIndex.getAll()}> Home </Link>
      </div>
    )
  }
}

export default Sidebar
