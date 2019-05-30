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
      //status:'',
      assigneeList: []
  
    }
  }
  
  async getIssue() {
    var res = await axios.get(`https://issue-tracker-asw-ruby.herokuapp.com/issues/${this.props.match.params.id}.json`);
   
    const issue = res.data;
    this.setState({ issue });
    this.setState({ title:issue.title });
    this.setState({ description:issue.description }); 
    this.setState({ id:issue.id });
  } 

  async getUsers() {
    var res = await axios.get ('https://issue-tracker-asw-ruby.herokuapp.com/users.json');

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
    this.setState({assigneeList:assigneeListRes})
    
    this.organizeSelects();
  }


  modifyIssue() {
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

    if (this.state.assignee!='') {
  
      var assignee = this.state.issue.assignee.id;
      for(var i=0; i<this.state.assigneeList.length; i++){ 
        if (assignee == this.state.assigneeList[i].value) {
        
          var aux = this.state.assigneeList[i];
          this.setState({assignee:aux});
        } 
      }
    }
    else{

      this.setState({ assignee: this.state.assigneeList[this.state.assigneeList.length-1] });

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
    this.setState({title: event.target.value})
  }  
  handleDescription(event) {
    this.setState({description: event.target.value})
  }  

  handleKind = (kind) => {
    this.setState({ kind });
  }
  handlePriority = (priority) => {
    this.setState({ priority });
  }
  handleAssignee = (assignee) => {
    this.setState({ assignee });
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
          <div>
          <table className = "adams-table">
                <tbody>
                  <tr className="adams-tr">
                    <td className="adams-label"><label for="issue_title">Title </label></td>
                    <td className="adams-field">
                      <input className="adams-input" type="text" name="title" value={this.state.title} 
                      onChange={this.handleTitle.bind(this)}/>
                    </td>
                  </tr>
                  <tr className="adams-tr">
                    <td className="adams-label"><label for="issue_description">Description </label></td>
                    <td className="adams-field"><input className="adams-input"  type="text" name="description" value={this.state.description} 
                    onChange={this.handleDescription.bind(this)}/></td>
                  </tr>
                  <tr className="adams-tr">
                    <td className="adams-label"><label for="issue_kind">Kind </label></td>
                    <td className="adams-field">
                      <Select
                        value={this.state.kind}
                        onChange={this.handleKind}
                        options={kinds}
                      />
                    </td>
                  </tr>
                  <tr className="adams-tr">
                    <td className="adams-label"><label for="issue_priority">Priority </label></td>
                    <td className="adams-field">
                      <Select
                        value={this.state.priority}
                        onChange={this.handlePriority}
                        options={priorities}
                      />
                    </td>
                  </tr>
                  <tr className="adams-tr">
                    <td className="adams-label"><label for="issue_assignee">Assignee </label></td>
                    <td className="adams-field">
                      <Select
                        value={this.state.assignee}
                        onChange={this.handleAssignee}
                        options={this.state.assigneeList}
                      />  
                    </td>
                  </tr>
                  {/* <tr className="adams-tr">
                    <td className="adams-label"><label for="issue_assignee">Status </label></td>
                    <td className="adams-field">
                      <Select
                        value={this.state.status}
                        onChange={this.handleStatus}
                        options={statuses}
                      />  
                    </td>
                  </tr> */}
                </tbody>
          </table>
            <div className="row">
              <button id = "newIssue"
                onClick={this.modifyIssue.bind(this)}
                title="Create Issue"
                color="#841584">Update Issue</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default EditIssue
