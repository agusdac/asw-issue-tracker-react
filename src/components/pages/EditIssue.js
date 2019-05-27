import React, { Component } from 'react';
import Select from 'react-select';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Sidebar from '../Sidebar';

const kinds = [
  { value: 'bug', label: 'Bug' },
  { value: 'enhancement', label: 'Enhancement' },
  { value: 'proposal', label: 'Proposal' },
  { value: 'task', label: 'Task' }
];

const priorities = [
  { value: 'trivial', label: 'Trivial' },
  { value: 'minor', label: 'Minor' },
  { value: 'major', label: 'Major' },
  { value: 'critical', label: 'Critical' },
  { value: 'blocker', label: 'Blocker' }
];


export class EditIssue extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      description: '',
      kind:'',
      priority:'',
      asignee:'',
  
    }
  }
  

  createIssue() {
    console.log(this.state.title);
    var url = 'https://issue-tracker-asw-ruby.herokuapp.com/issues.json';
    if(this.state.assignee!=='') {
      axios.put(url, {
        title: this.state.title,
        description: this.state.description,
        assignee_id: this.state.assignee.value,
        kind: this.state.kind.value,
        priority: this.state.priority.value,
      }, {
        headers: {
          "accept":"*/*",
          "tokenGoogle":"ya29.Gl0JB3hpwEwV6h-9Gntzfnl9DixwdK6-pw4GzCpvSNbLH2Y6cqDIOfxGKwFUGJXy0iZp94eMCjTILWc4BRf2Bwn1B4LH0qtWhH45OR-IIpVbNAlS1rREeKGoG3vLcKI",
          "Content-Type":"application/json"
        }
      } )
    } else{
      axios.put(url, {
        title: this.state.title,
        description: this.state.description,
        kind: this.state.kind.value,
        priority: this.state.priority.value,
      }, {
        headers: {
          "accept":"*/*",
          "tokenGoogle":"ya29.Gl0JB3hpwEwV6h-9Gntzfnl9DixwdK6-pw4GzCpvSNbLH2Y6cqDIOfxGKwFUGJXy0iZp94eMCjTILWc4BRf2Bwn1B4LH0qtWhH45OR-IIpVbNAlS1rREeKGoG3vLcKI",
          "Content-Type":"application/json"
        }
      } )
    }
  }


  componentDidMount() {
    
  }

  handleTitle(event) {
    console.log(event.target.value);
    this.setState({title: event.target.value})
  }  
  handleDescription(event) {
    this.setState({description: event.target.value})
  }  

  handleKind = (kind) => {
    this.setState({ kind });
    console.log(`Option selected:`, kind.value);
  }
  handlePriority = (priority) => {
    this.setState({ priority });
    console.log(`Option selected:`, priority.value);
  }
  handleAssignee = (assignee) => {
    this.setState({ assignee });
    console.log(`Option selected:`, assignee.value);
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
            <h1>
              Create a new Issue
            </h1>
          </div>
          <p>
            <div className="row">
              <label for="issue_title">Title </label>
              <input id="issue_title" class="form-control" type="text" name="title" value={this.state.title} 
              onChange={this.handleTitle.bind(this)}/>
            </div>
            <div className="row">
              <label for="issue_description">Description </label>
              <input id="issue_description" class="form-control" type="text" name="description" value={this.state.description} 
              onChange={this.handleDescription.bind(this)}/>
            </div>
            <div className="row">
              <label for="issue_kind">Kind </label>
              <input id="issue_kind" class="form-control" type="text" name="kind" value={this.state.kind} 
              onChange={this.handleKind.bind(this)}/>
            </div>
            <div className="row">
              <label for="issue_priority">Priority </label>
              <Select
                //value={selectedOption}
                //onChange={this.handleChange}
                options={priorities}
              />
              <input id="issue_priority" class="form-control" type="text" name="priority" value={this.state.priority} 
              onChange={this.handlePriority.bind(this)}/>
            </div>
            <div className="row">

              <label for="issue_assignee">Assignee </label>
              <input id="issue_assignee" class="form-control" type="text" name="assignee" value={this.state.assignee} 
              onChange={this.handleAssignee.bind(this)}/>
            </div>
            <div className="row">
              <button
                onClick={this.createIssue.bind(this)}
                title="Create Issue"
                color="#841584">Create Issue</button>
            </div>
          </p>
        </div>
      </div>
    )
  }
}

export default EditIssue
