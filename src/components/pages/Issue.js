import React, { Component } from 'react'
import axios from 'axios';
import moment from 'moment';
import Sidebar from '../Sidebar';

export class Issue extends Component {

  constructor() {
    super();
    this.state = {
      issue: {},
      value: '',
      token:''
    }
  }

  getLocalStorage() {
    const tokenlocal = localStorage.getItem('uid');
    console.log("Local Storage token" + tokenlocal);
    this.setState({token: tokenlocal}, () => console.log('State: ' + this.state.token));
  }

  componentDidMount() {
    axios.get(`https://issue-tracker-asw-ruby.herokuapp.com/issues/${this.props.match.params.id}.json`)
      .then(res => {
        const aux = res.data;
        this.setState({ issue:aux });
      })

      this.getLocalStorage();
  }

  handleSubmit(event){
    event.preventDefault();
    var url = `https://issue-tracker-asw-ruby.herokuapp.com/issues/${this.props.match.params.id}/comments.json`;
    console.log(url);
    axios.post(url, {
      content: this.state.value
    }, {
      headers: {
        "accept":"*/*",
        "tokenGoogle": localStorage.getItem('uid'),
        "Content-Type":"application/json"
      }
    } ).then(res => {
      console.log('Result: ' + res.data);
    }).catch((error)=>{
       console.log('Error: ' + error);
    });
  }

  handleChange(event){
    this.setState({value: event.target.value});
  }

  render() {
    return (
      <div>
        {/*
        <div className="index">
          <div className="sidebar">
            <p>
              <Sidebar/>
            </p>
          </div>
        </div>
        */}
        <h1>#{this.state.issue.id} {this.state.issue.title}</h1>
        <p>{this.state.issue.description}</p>
        <hr></hr>
        <p>Kind: {this.state.issue.kind}</p>
        <p>Priority: {this.state.issue.priority}</p>
        <p>Status: {this.state.issue.status}</p>
        <hr></hr>
        <p>Comments ({undefined !== this.state.issue.comments ? this.state.issue.comments.length : 0})</p>
        {undefined !== this.state.issue.comments ? this.state.issue.comments.reverse().map(comment =>
          <p>{comment.content} - {moment(comment.created_at).fromNow()}</p>
        ) : null}
        <form onSubmit={this.handleSubmit.bind(this)}>
            <textarea value={this.state.value} onChange={this.handleChange.bind(this)}/>
          <input type="submit" value="Send" />
        </form>
      </div>
    )
  }
}

export default Issue
