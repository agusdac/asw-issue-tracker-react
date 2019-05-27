import React, { Component } from 'react';

import axios from 'axios';
import moment from 'moment';
import { Link } from 'react-router-dom';
import "./css/IssueIndex.css"
import Sidebar from './Sidebar';
//import de fotos
import blocker from '../images/blocker.svg';
import bug from '../images/bug.svg';
import critical from '../images/critical.svg';
import enhancement from '../images/enhancement.svg';
import major from '../images/major.svg';
import minor from '../images/minor.svg';
import proposal from '../images/proposal.svg';
import task from '../images/task.svg';
import trivial from '../images/trivial.svg';
import unwatch from '../images/unwatch.svg';
import watch from '../images/watch.svg';

export class IssueIndex extends Component {
    
    state = {
      issues: [],
      initialIssues: [],
      logged: true,
    }
  
    signIn() {
      this.setState({logged: true})
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

    myIssues() {
      axios.get("https://issue-tracker-asw-ruby.herokuapp.com/issues.json?user_id=m")
        .then(res => {
          const issues = res.data;
          this.setState({ issues });
        })
    }
    
    watching() {
      axios.get("https://issue-tracker-asw-ruby.herokuapp.com/issues.json?user_id=w")
        .then(res => {
          const issues = res.data;
          this.setState({ issues });
        })
    }

    checkassignee(issue) {
      if(issue.assignee) {
        return (
          <td className = "kind"onClick = {() => this.filter("assignee_id", issue.assignee.id)}>
            <img className="perfil_image_table" src = {issue.assignee.imageurl} alt = "user" />{issue.assignee.name}</td>
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

    getImage(param) {
      var source;
      if (param === 'blocker') source = blocker;
      else if (param === 'bug') source = bug;
      else if (param === 'critical') source = critical;
      else if (param === 'enhancement') source = enhancement;
      else if (param === 'major') source = major;
      else if (param === 'minor') source = minor;
      else if (param === 'proposal') source = proposal;
      else if (param === 'task') source = task;
      else source = trivial;
      return (
        <img src = {source} alt = {param}/>
      )
    }

    changeColor(element) {
        // Check to see if the button is pressed
        var pressed = (element.target.getAttribute("aria_pressed") === "true");
        // Change aria-pressed to the opposite state
        element.target.setAttribute("aria_pressed", !pressed);
      }

    watchIssue(id) {

    }

    unwatchIssue(id) {

    }

    checkWatching(issue) {
      var amI;
      if (issue.watches.length === 0) amI = false;
      issue.watches.forEach((watch) => {
          if (watch.user_id === 1) amI = true;
        }
      )
      
      if(!amI) {
        return (
          <td>{<img id = "watch" src = {watch} alt = "Watch" onClick = {() => this.watchIssue(issue.id)}/>}</td>
        )
      }
      else {
        return (
          <td>{<img id = "watch" src = {unwatch} alt = "Unwatch" onClick = {() => this.unwatchIssue(issue.id)}/>}</td>
        )
      }
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
                <li className = "filter"> <Link to={'/'} onClick = {()=> this.iniIssues()}> All </Link></li>
                <li className = "filter"> <Link to={'/'} onClick = {()=> this.filter("status", "open")}> Open </Link> </li>
                {this.state.logged ? <li className = "filter"> <Link to={'/'} onClick = {()=> this.myIssues()}> My Issues </Link></li> 
                :<td></td>}
                {this.state.logged ? <li className = "filter"> <Link to={'/'} onClick = {()=> this.watching()}> Watching </Link></li>
                :<td></td>}
              </ul>
            </div>
            <h1 className = "fullTitle">
              Issues({this.state.issues.length})
            </h1>
            <span id = "newIssue">
              <Link to={'/issues/new'}> Create Issue</Link>
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
                    <td className = "issuetitle"><Link to={`/issue/${issue.id}`}>#{issue.id}: {issue.title}</Link></td>
                    <td className = "kind" onClick = {() => this.filter("kind", issue.kind)}>{this.getImage(issue.kind)}</td>
                    <td className = "kind" onClick = {() => this.filter("priority", issue.priority)}>{this.getImage(issue.priority)}</td>
                    <td className = "status" onClick = {() => this.filter("status", issue.status)}>{issue.status}</td>
                    {issue.votes.length === 0 ? <td></td> : <td id = "vote">{issue.votes.length}</td>}
                    {this.checkassignee(issue)}
                    <td>{moment(issue.created_at).fromNow()}</td>
                    <td>{moment(issue.updated_at).fromNow()}</td>
                    {this.state.logged ? this.checkWatching(issue)
                    : <td></td>}
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
