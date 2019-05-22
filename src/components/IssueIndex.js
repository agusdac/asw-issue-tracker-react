import React, { Component } from 'react';
import {Button} from 'react-bootstrap';

import axios from 'axios';
import moment from 'moment';
import { Link } from 'react-router-dom';
import "./css/IssueIndex.css"
import Sidebar from './Sidebar';
export class IssueIndex extends Component {
    
    state = {
      issues: [],
      initialIssues: []
    }
  
    getAll() {
      axios.get("https://issue-tracker-asw-ruby.herokuapp.com/issues.json")
        .then(res => {
          const issues = res.data;
          // alert(JSON.stringify(res.data[0].votes.length))
          this.setState({ issues });
          this.setState({ initialIssues: issues });
        })
    }

    componentDidMount() {
      this.getAll();
    }

    iniIssues() {
      this.setState({ issues: this.state.initialIssues });
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
          <td style= {{verticalAlign:"middle"}} onClick = {() => this.filter("assignee_id", issue.assignee.id)}>
            <img class="perfil_image_table" src = {issue.assignee.imageurl} alt = "user" />{issue.assignee.name}</td>
        )
      }
      else {
        return (<td></td>)
      }
    }

    sort(param, dir) {
      axios.get("https://issue-tracker-asw-ruby.herokuapp.com/issues.json?sort=" + param + "&dir=" + dir)
        .then(res => {
          const issues = res.data;
          this.setState({ issues });
        })
    }

    render() {
      
    return (
      <div className = "index">
        <div className = "sidebar">
          <p>
            <Sidebar />
          </p>
        </div>
        <div className = "body">
          <div className = "header">
            <div className = "filter-container">
              <p className = "filter-label">
                Filter by: 
              </p>
              <ul className = "filter-status">
                <li className = "filter" aria_pressed = "true"> <Link to={'/'} onClick = {()=> this.iniIssues()}> All </Link></li>
                <li className = "filter"> <Link to={'/'} onClick = {()=> this.filter("status", "open")}> Open </Link> </li>
                <li className = "filter"> <Link to={'/'}> My Issues </Link></li>
                <li className = "filter"> <Link to={'/'}> Watching </Link></li>
              </ul>
            </div>
            <h1>
              Issues({this.state.issues.length})
            </h1>
            <span id = "create_issue">
              <Link to={'/issues/create'}> Create Issue</Link>
            </span>
          </div>
          <p>
            <table className = "table">
              <thead className = "table_header">
                <tr id = "leyendaTR">
                  <th className="leyenda">Title 
                  <i className = "sort" onClick = {() => this.sort("id")}>↑</i>
                  <i className = "sort" onClick = {() => this.sort("id", "down")}>↓</i></th>
                  <th className="leyenda">Kind
                  <i className = "sort" onClick = {() => this.sort("kind")}>↑</i>
                  <i className = "sort" onClick = {() => this.sort("kind", "down")}>↓</i></th> 
                  <th className="leyenda">Priority
                  <i className = "sort" onClick = {() => this.sort("priority")}>↑</i>
                  <i className = "sort" onClick = {() => this.sort("priority", "down")}>↓</i></th>
                  <th className="leyenda">Status
                  <i className = "sort" onClick = {() => this.sort("status")}>↑</i>
                  <i className = "sort" onClick = {() => this.sort("status", "down")}>↓</i></th>
                  <th className="leyenda">Votes</th>
                  <th className="leyenda">Assignee
                  <i className = "sort" onClick = {() => this.sort("assignee_id")}>↑</i>
                  <i className = "sort" onClick = {() => this.sort("assignee_id", "down")}>↓</i></th>
                  <th className="leyenda">Created
                  <i className = "sort" onClick = {() => this.sort("created_at")}>↑</i>
                  <i className = "sort" onClick = {() => this.sort("created_at", "down")}>↓</i></th>
                  <th className="leyenda">Updated
                  <i className = "sort" onClick = {() => this.sort("updated_at")}>↑</i>
                  <i className = "sort" onClick = {() => this.sort("updated_at", "down")}>↓</i></th>
                </tr>
              </thead>
              <tbody className = "table_body">
                { this.state.issues.map(issue => 
                <tr>
                    <td><Link to={`/issue/${issue.id}`}>#{issue.id}: {issue.title}</Link></td>
                    <td onClick = {() => this.filter("kind", issue.kind)}>{issue.kind}</td>
                    <td onClick = {() => this.filter("priority", issue.priority)}>{issue.priority}</td>
                    <td className = "status" onClick = {() => this.filter("status", issue.status)}>{issue.status}</td>
                    {issue.votes.length === 0 ? <td></td> : <td id = "vote">{issue.votes.length}</td>}
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
