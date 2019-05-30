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
      issue: '',
      id:'',
      title: '',
      description: '',
      kind:'',
      priority:'',
      assignee:'',
      assigneeList: []
  
    }
  }
  
  async getIssue() {
    var res = await axios.get(`https://issue-tracker-asw-ruby.herokuapp.com/issues/${this.props.match.params.id}.json`);
    console.log(res.data);
    console.log("testing kinds// kind value of issue = " + res.data.kind)
    const issue = res.data;
    this.setState({ issue });
    this.setState({ title:issue.title });
    this.setState({ description:issue.description }) 
    this.setState({ id:issue.id })
  } 

  async getUsers() {
    var res = await axios.get ('https://issue-tracker-asw-ruby.herokuapp.com/users.json');

    console.log(res.data);
    var assigneeListRes = res.data.map((user) => {
      return (
        {
          value: String(user.id),
          label: user.name,
        }
      )  
    }) 
    assigneeListRes.push({ 
      value: "no assignee",
      label: "No assignee"
    }
    )
    //console.log(assigneeListRes);
    this.setState({assigneeList:assigneeListRes})
    console.log("assigneeList from state");
    console.log(this.state.assigneeList);
    this.organizeSelects();
  }


  modifyIssue() {
    console.log(localStorage.getItem('uid'));
    var url = 'https://issue-tracker-asw-ruby.herokuapp.com/issues/' + this.state.issue.id + '.json';
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
          "tokenGoogle":localStorage.getItem('uid'),
          "Content-Type":"application/json"
        }
      } ).then(res => {   
        this.props.history.push("/issue/"+res.data.id)
    })
    } else {
      axios.put(url, {
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
              // console.log(res.data.id);
              this.props.history.push("/issue/"+res.data.id)
          })
    }
  }

  organizeSelects() { 
    
    var kind = this.state.issue.kind; 
    var priority = this.state.issue.priority;
    var assignee = this.state.issue.assignee.id;
    console.log("this.state.issue" + this.state.issue);
    console.log("this.state.issue.assignee" + this.state.issue.assignee);
    console.log("this.state.issue.assignee.id" + this.state.issue.assignee.id);
    console.log("testing assignee list before doing fors IS ");
    console.log(this.state.assigneeList);
  
    for(var i=0; i<kinds.length; i++){ 
      if (kind == kinds[i].value) {
        this.setState({kind:kinds[i]})
      } 
    }
    for(var i=0; i<priorities.length; i++){ 
      if (priority == priorities[i].value) {
        this.setState({priority:priorities[i]})
      } 
    }
    console.log("assigneeList from state in organize");
    console.log(this.state.assigneeList);
    for(var i=0; i<this.state.assigneeList.length; i++){ 
      if (assignee == this.state.assigneeList[i].value) {
        console.log("existing assignee is " + this.state.assigneeList[i].label);
        var aux = this.state.assigneeList[i];
        console.log(aux.label);
        this.setState({assignee:aux});
        console.log("state.assignee is " + this.state.assignee.label);
      } 
    }
  }


  componentDidMount() {//nope, te paso foto por whats. sigue siendo undefined
    this.prueba();
  }

  async prueba() {
    await this.getIssue();
    await this.getUsers();
    //await this.organizeSelects();
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
    console.log(`priority selected:`, priority.value);
  }
  handleAssignee = (assignee) => {
    this.setState({ assignee });
    console.log(`assig selected:`, assignee.value);
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
              Edit Issue #{this.state.id}
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
              <Select
                value={this.state.kind}
                onChange={this.handleKind}
                options={kinds}
              />
            </div>
            <div className="row">
              <label for="issue_priority">Priority </label>
              <Select
                value={this.state.priority}
                onChange={this.handlePriority}
                options={priorities}
              />
            </div>
            <div className="row">

              <label for="issue_assignee">Assignee </label>

              <Select
                value={this.state.assignee}
                onChange={this.handleAssignee}
                options={this.state.assigneeList}
              />

            </div>
            <div className="row">
              <button
                onClick={this.modifyIssue.bind(this)}
                title="Create Issue"
                color="#841584">Update Issue</button>
            </div>
          </p>
        </div>
      </div>
    )
  }
}

export default EditIssue
