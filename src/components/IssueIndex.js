import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';

export class IssueIndex extends Component {
    
    state = {
      issues: [],
    }
  
    componentDidMount() {
      axios.get("https://issue-tracker-asw-ruby.herokuapp.com/issues.json")
        .then(res => {
          const issues = res.data;
          alert(JSON.stringify(res.data))
          this.setState({ issues });
        })
    }

    render() {
      
    return (
      <div>
        <p>
          ISSUES(*)
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
                    <td>{issue.title}</td>
                    <td>{issue.kind}</td>
                    <td>{issue.priority}</td>
                    <td>{issue.status}</td>
                    <td>{issue.votes.count}</td>
                    <td>issue.assignee.name</td>
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
