import React, { Component } from 'react';
import {Button} from 'react-bootstrap';

import axios from 'axios';
import moment from 'moment';
import { Link } from 'react-router-dom';
import "./css/IssueIndex.css"
export class IssueIndex extends Component {
    
    state = {
      issues: [],
    }
  
    getAll() {
      axios.get("https://issue-tracker-asw-ruby.herokuapp.com/issues.json")
        .then(res => {
          const issues = res.data;
          // alert(JSON.stringify(res.data[0].votes.length))
          this.setState({ issues });
        })
    }

    componentDidMount() {
      this.getAll();
    }

    filter(filt, val) {
      axios.get("https://issue-tracker-asw-ruby.herokuapp.com/issues.json?" + filt + "=" + val)
        .then(res => {
          const issues = res.data;
          this.setState({ issues });
        })
    }

    checkassignee(issue) {
      if(issue.assignee) {
        return (
          <td onClick = {() => this.filter("assignee_id", issue.assignee.id)}>{issue.assignee.name}</td>
        )
      }
      else {
        return (<td></td>)
      }
    }

    render() {
      
    return (
      <div className = "index">
        <div className = "sidebar">
          <p>
            <Link to={'/'}> Home </Link>
          </p>
        </div>
        <div className = "body">
          <div className = "filter-container">
            <p className = "filter-label">
              Filter by: 
            </p>
            <ul className = "filter-status">
              <li className = "filter" aria_pressed = "true"> <Link to={'/'} onClick = {()=> this.getAll()}> All </Link></li>
              <li className = "filter"> <Link to={'/'}> Open </Link> </li>
              <li className = "filter"> <Link to={'/'}> My Issues </Link></li>
              <li className = "filter"> <Link to={'/'}> Watching </Link></li>
            </ul>
          </div>
          <h1>
            ISSUES({this.state.issues.length})
          </h1>
          <p>
            <table className = "table">
              <tr>
                <th>Title</th>
                <th>Kind</th> 
                <th>Priority</th>
                <th>Status</th>
                <th>Votes</th>
                <th>Assignee</th>
                <th>Created</th>
                <th>Updated</th>
              </tr>
              <tbody>
                { this.state.issues.map(issue => 
                <tr>
                    <td><Link to={`/issue/${issue.id}`}>#{issue.id} {issue.title}</Link></td>
                    <td onClick = {() => this.filter("kind", issue.kind)}>{issue.kind}</td>
                    <td onClick = {() => this.filter("priority", issue.priority)}>{issue.priority}</td>
                    <td onClick = {() => this.filter("status", issue.status)}>{issue.status}</td>
                    <td>{issue.votes.length === 0 ? "" : issue.votes.length}</td>
                    {this.checkassignee(issue)}
                    <td>{moment(issue.created_at).fromNow()}</td>
                    <td>{moment(issue.updated_at).fromNow()}</td>
                    <td><Button>Watch</Button></td>
                </tr>
                )}
            </tbody>
          </table>
        </p>
      </div>
    </div>
    )
  }
}

export default IssueIndex
