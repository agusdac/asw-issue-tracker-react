import React, { Component } from 'react';
import Select from 'react-select';
import axios from 'axios';
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
      assignee:'',
      assignee_list:'',
      assignee_list_json:'',
      token:''
    }
  }
  

  createIssue() {
    console.log(localStorage.getItem('uid'));
    var url = 'https://issue-tracker-asw-ruby.herokuapp.com/issues.json';
    if(this.state.assignee!=='') {
      axios.post(url, {
        title: this.state.title,
        description: this.state.description,
        assignee_id: this.state.assignee.value,
        kind: this.state.kind.value,
        priority: this.state.priority.value,
      }, {
        headers: {
          "accept":"*/*",
          "tokenGoogle":localStorage.getItem('uid'),
          "Content-Type":"application/json"
        }
      } ).then(res => {   console.log(res.data);    })
    } else {
      axios.post(url, {
        title: this.state.title,
        description: this.state.description,
        kind: this.state.kind.value,
        priority: this.state.priority.value,
      }, {
        headers: {
          "accept":"*/*",
          "tokenGoogle": localStorage.getItem('uid'),
          "Content-Type":"application/json"
        }
      } ).then(res => {   
              console.log(res.data.id);
              this.props.history.push("/issue/"+res.data.id);      })
    }
    //this.props.history.push("/"); //shauria de cambiar a show d issue (si es pot, nose com obtenir el id del issue just creat)
  }

  getUsers() {
    var url = 'https://issue-tracker-asw-ruby.herokuapp.com/users.json';
    axios.get(url)
    .then(res => {
      const assignee_list_json_axios = res.data;
       //alert(JSON.stringify(res.data[0].votes.length))

      console.log(assignee_list_json_axios);
      this.setState({ 
        assignee_list_json: assignee_list_json_axios });
      console.log(this.state.assignee_list_json);
    }).then(this.organizeAss) 
  }
  

  organizeAss() {
  

  }

  getLocalStorage() {
    const tokenlocal = localStorage.getItem('uid');
    console.log("local storage token" + tokenlocal);
    this.setState({token: tokenlocal});
    console.log(this.state.token);
  }

  componentDidMount() {
    this.getLocalStorage();
    this.getUsers();
    
    // this.organizeAss();
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
  // handleKind(event) {
  //   console.log(event.target.value);

  //   this.setState({kind: event.target.value})
  // }  
  handlePriority(event) {
    this.setState({priority: event.target.value})
  }
  handleAssignee(event) {
    this.setState({assignee: event.target.value})
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
          <div>
            <div className="row">
              <label for="issue_title">Title </label>
              <input id="issue_title"  type="text" name="title" value={this.state.title} 
              onChange={this.handleTitle.bind(this)}/>
            </div>
            <div className="row">
              <label for="issue_description">Description </label>
              <input id="issue_description"  type="text" name="description" value={this.state.description} 
              onChange={this.handleDescription.bind(this)}/>
            </div>
            <div className="row">
              <label for="issue_kind">Kind </label>
              <Select
                //value={selectedOption}
                onChange={this.handleKind}
                options={kinds}
              />
              {/* <input id="issue_kind" class="form-control" type="text" name="kind" value={this.state.kind} 
              onChange={this.handleKind.bind(this)}/> */}
            </div>
            <div className="row">
              <label for="issue_priority">Priority </label>
              <Select
                //value={selectedOption}
                onChange={this.handlePriority}
                options={priorities}
              />
              {/* <input id="issue_priority" class="form-control" type="text" name="priority" value={this.state.priority} 
              onChange={this.handlePriority.bind(this)}/> */}
            </div>
            <div className="row">

              <label for="issue_assignee">Assignee </label>

              <Select
                //value={selectedOption}
                onChange={this.handlePriority}
                //options={this.state.assignee_list_json}
              />
              
              {/* <input id="issue_assignee" class="form-control" type="text" name="assignee" value={this.state.assignee} 
              onChange={this.handleAssignee.bind(this)}/> */}
            </div>
            <div className="row">
              <button
                onClick={this.createIssue.bind(this)}
                title="Create Issue"
                color="#841584">Create Issue</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default EditIssue
