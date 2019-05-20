import React, { Component } from 'react'
import "./css/IssueIndex.css"
import { Link } from 'react-router-dom';

export class Sidebar extends Component {
  render() {
    return (
      <div className = "sidebar" >
        <Link to={'/'}> Home </Link>
      </div>
    )
  }
}

export default Sidebar
