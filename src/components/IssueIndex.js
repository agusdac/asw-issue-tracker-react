import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Link } from 'react-router-dom';

export class IssueIndex extends Component {
    
    state = {
      issues: [],
    }
  
    componentDidMount() {
      axios.get("https://issue-tracker-asw-ruby.herokuapp.com/issues.json")
        .then(res => {
          const issues = res.data;
          // alert(JSON.stringify(res.data[0].votes.length))
          this.setState({ issues });
        })
    }

    checkassignee(issue) {
      if(issue.assignee) {
        return (
          <td>{issue.assignee.name}</td>
        )
      }
      else {
        return (<td></td>)
      }
    }

    countVotes(issue) {
      if(issue.votes) {
        
      }
    }

    render() {
      
    return (
      <div>
        <p>
          ISSUES({this.state.issues.length})
        </p>
        <p>
          <table >
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
                    <td>{issue.kind}</td>
                    <td>{issue.priority}</td>
                    <td>{issue.status}</td>
                    <td>{issue.votes.length}</td>
                    {this.checkassignee(issue)}
                    <td>{moment(issue.created_at).fromNow()}</td>
                    <td>{moment(issue.updated_at).fromNow()}</td>
                </tr>
                )}
            </tbody>
          </table>
        </p>
      </div>
    )
  }
}

export default IssueIndex
