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
      assigneeList:[],
    }
  }
  

  createIssue() {
    console.log(localStorage.getItem('uid'));
    console.log("assignee is" + this.state.assignee.value);
    console.log("priority is" + this.state.priority);
    var url = 'https://issue-tracker-asw-ruby.herokuapp.com/issues.json';
    if(this.state.assignee.value=="no assignee") {
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
        console.log("post w no assignee") 
        this.props.history.push("/issue/"+res.data.id)
    })
    } else {
      axios.post(url, {
        title: this.state.title,
        description: this.state.description,
        assignee_id: this.state.assignee.value,
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
              this.props.history.push("/issue/"+res.data.id)
          })
    }
  }

  

  getUsers() {
    var url = 'https://issue-tracker-asw-ruby.herokuapp.com/users.json';
    axios.get(url)
    .then(res => {

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
      console.log(this.state.assigneeList)
    })
  }

  componentDidMount() {
    this.getUsers();
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
    console.log(`Priority selected:`, priority.value);
    console.log(`Priority in state:`, this.state.priority);

  }
  handleAssignee = (assignee) => {
    this.setState({ assignee: assignee });
    console.log(`Assignee selected in state:`, this.state.assignee);
    console.log(`Assignee selected in box:`, assignee.value);

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
            <table className = "adams-table">
                <tbody>
            
                  <tr className="adams-tr">
                    <td className="adams-label"><label for="issue_title">Title </label></td>
                    <td className="adams-field"><input className="adams-input"  type="text" name="title" value={this.state.title} //id="issue_title"
                    onChange={this.handleTitle.bind(this)}/></td>
                  </tr>
                  <tr className="adams-tr">
                    <td className="adams-label"><label for="issue_description">Description </label></td>
                    <td className="adams-field"><input className="adams-input"  type="text" name="description" value={this.state.description} 
                    onChange={this.handleDescription.bind(this)}/></td>
                  </tr>
                  <tr className="adams-tr">
                    <td className="adams-label"><label for="issue_kind">Kind </label></td>
                    <td className="adams-field"><Select
                      onChange={this.handleKind}
                      options={kinds}
                    /></td>
                  </tr>
                  <tr className="adams-tr">
                    <td className="adams-label"><label for="issue_priority">Priority </label></td>
                    <td className="adams-field"><Select
                    
                      onChange={this.handlePriority}
                      options={priorities}
                    /></td>
                  </tr>
                  <tr className="adams-tr">
                    <td className="adams-label"><label for="issue_assignee">Assignee </label></td>
                    <td className="adams-field"><Select

                      onChange={this.handleAssignee}
                      options={this.state.assigneeList}
                    /></td>
                  </tr>
              </tbody>
            </table>
            <div className="row">
              <button id = "newIssue"
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
