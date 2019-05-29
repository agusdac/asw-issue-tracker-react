import React, { Component } from 'react'
import axios from 'axios';
import moment from 'moment';
import Sidebar from '../Sidebar';
import { Link } from 'react-router-dom';
import "../css/IssueIndex.css"

export class Issue extends Component {

  constructor() {
    super();
    this.state = {
      issue: {},
      value: '',
      token:'',
      userId:'',
      name:'',
      users:[],
      logged:'false'
    }
  }

  getLocalStorage() {
    const tokenlocal = localStorage.getItem('uid');
    this.setState({token: tokenlocal,
       userId:localStorage.getItem('userId'),
       name: localStorage.getItem('name'),
       logged : localStorage.getItem('logged'),
      }, () => console.log('State/Token: ' + this.state.token + 'State/UserId: ' + this.state.userId));
  }

  componentDidMount() {
    var urlUsers = 'https://issue-tracker-asw-ruby.herokuapp.com/users.json';
    axios.get(urlUsers)
      .then(res => {
        const aux = res.data;
        this.setState({ users:aux });
      });
    axios.get(`https://issue-tracker-asw-ruby.herokuapp.com/issues/${this.props.match.params.id}.json`)
      .then(res => {
        const aux = res.data;
        this.setState({ issue:aux });
      });

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
        "tokenGoogle": this.state.token,
        "Content-Type":"application/json"
      }
    } ).then(res => {
      window.location.reload();
    }).catch((error)=>{
       console.log('Error: ' + error);
    });
  }

  handleChange(event){
    this.setState({value: event.target.value});
  }

  hasUserVoted(){
    var b = false;
    if(this.state.issue.votes !== undefined){
      this.state.issue.votes.forEach(vote => {
        if(vote.user_id == this.state.userId) b = true;
      });
    }
    return b;
  }

  hasUserWatched(){
    var b = false;
    if(this.state.issue.watches !== undefined){
      this.state.issue.watches.forEach(watch => {
        if(watch.user_id == this.state.userId) b = true;
      });
    }
    return b;
  }

  removeVote(){
    var voteId = -1;
    if(this.state.issue.votes !== undefined){
      this.state.issue.votes.forEach(vote => {
        if(vote.user_id == this.state.userId) voteId = vote.id;
      });
    }
    if (voteId < 0) return;
    var url = `https://issue-tracker-asw-ruby.herokuapp.com/issues/${this.state.issue.id}/votes/${voteId}.json`;
    axios.delete(url,{
      headers: {
        "accept":"*/*",
        "tokenGoogle": this.state.token,
        "Content-Type":"application/json"
      }
    }).then(res => {
        window.location.reload();
      });
  }

  voteIssue(){
    var url = `https://issue-tracker-asw-ruby.herokuapp.com/issues/${this.state.issue.id}/votes.json`;
    axios.post(url,{},{
      headers: {
        "accept":"*/*",
        "tokenGoogle": this.state.token,
        "Content-Type":"application/json"
      }
    }).then(res => {
        window.location.reload();
      });
  }

  removeWatch(){
    var watchId = -1;
    if(this.state.issue.watches !== undefined){
      this.state.issue.watches.forEach(watch => {
        if(watch.user_id == this.state.userId) watchId = watch.id;
      });
    }
    if (watchId < 0) return;
    var url = `https://issue-tracker-asw-ruby.herokuapp.com/issues/${this.state.issue.id}/watches/${watchId}.json`;
    axios.delete(url,{
      headers: {
        "accept":"*/*",
        "tokenGoogle": this.state.token,
        "Content-Type":"application/json"
      }
    }).then(res => {
        window.location.reload();
      }).catch(error => {
        window.location.reload();
      });
  }

  watchIssue(){
    var url = `https://issue-tracker-asw-ruby.herokuapp.com/issues/${this.state.issue.id}/watches.json`;
    axios.post(url,{},{
      headers: {
        "accept":"*/*",
        "tokenGoogle": this.state.token,
        "Content-Type":"application/json"
      }
    }).then(res => {
        window.location.reload();
      }).catch(error => {
        window.location.reload();
      });
  }

  getNameOfUserId(id){
    var name = 'Anonymous';
    this.state.users.map(user => {
      if(user.id == id) name = user.name;
    });
    return name;
  }

  deleteComment(id){
    var url = `https://issue-tracker-asw-ruby.herokuapp.com/issues/${this.state.issue.id}/comments/${id}.json`;
    axios.delete(url,{
      headers: {
        "accept":"*/*",
        "tokenGoogle": this.state.token,
        "Content-Type":"application/json"
      }
    }).then(res => {
        window.location.reload();
      });
  }

  render() {
    return (
      <div className="index">
        <div className="sidebar">
          <p>
            <Sidebar/>
          </p>
        </div>
        <div className="body raul-body">
          <span className="raul-user-name">{this.state.name} <span className="raul-not-bold">created an issue</span> </span>
          <span className="raul-time-ago raul-not-bold">{moment(this.state.issue.created_at).fromNow()}</span>
          <br></br>
          <span className="raul-issue-title">#{this.state.issue.id} {this.state.issue.title}</span>
          <span className="raul-title-status">{this.state.issue.status}</span>
          
          <p className="raul-not-bold">{this.state.issue.description}</p>
          <hr></hr>
          <p>Assignee: 
          {
            this.state.issue.assignee !== undefined && this.state.issue.assignee !== null ? this.state.issue.assignee.name : null
          }
          </p>
          <p>Kind: {this.state.issue.kind}</p>
          <p>Priority: {this.state.issue.priority}</p>
          <p>Status: {this.state.issue.status}</p>
          <p>Votes: 
            { this.hasUserVoted() ?
            <span>
              <span className="raul-counter-active">{undefined !== this.state.issue.votes ? this.state.issue.votes.length : 0}</span>
              {
                this.state.logged == 'true' ?
                <span className="raul-like-a-link" onClick={this.removeVote.bind(this)}>Remove vote</span>
                :
                null
              }
            </span>
            :
            <span>
              <span className="raul-counter-inactive">{undefined !== this.state.issue.votes ? this.state.issue.votes.length : 0}</span>
              {
                this.state.logged == 'true' ?
                <span className="raul-like-a-link" onClick={this.voteIssue.bind(this)}>Vote this issue</span>
                :
                null
              }
            </span>
            }
          </p>
          <p>Watches: 
            { this.hasUserWatched() ?
            <span>
              <span className="raul-counter-active">{undefined !== this.state.issue.watches ? this.state.issue.watches.length : 0}</span>
              {
                this.state.logged == 'true' ?
                <span className="raul-like-a-link" onClick={this.removeWatch.bind(this)}>Unwatch this issue</span>
                :
                null
              }
            </span>
            :
            <span>
              <span className="raul-counter-inactive">{undefined !== this.state.issue.watches ? this.state.issue.watches.length : 0}</span>
              {
                this.state.logged == 'true' ?
                <span className="raul-like-a-link" onClick={this.watchIssue.bind(this)}>Watch this issue</span>
                :
                null
              }
            </span>
            }
          </p>
          <hr></hr>
          <p>Comments ({undefined !== this.state.issue.comments ? this.state.issue.comments.length : 0})</p>
          {undefined !== this.state.issue.comments ? this.state.issue.comments.map(comment =>
            <div className="raul-comment">
              <span className="raul-user-name">{this.getNameOfUserId(comment.user_id)} <span className="raul-not-bold"> commented </span> </span>
              <span className="raul-time-ago raul-not-bold">{moment(comment.created_at).fromNow()}</span>
              <p>{comment.content}</p>
              {
                (this.state.userId == comment.user_id) ? 
                <span>
                  <Link to={`/issue/${this.state.issue.id}/comments/${comment.id}/edit`}>Edit</Link> - 
                  <span className="raul-like-a-link" onClick={() => this.deleteComment(comment.id)} >Delete</span>
                </span>
                : 
                null
              }
            </div>
          ) : null}
          {
            this.state.logged == 'true' ?
            <form onSubmit={this.handleSubmit.bind(this)}>
              <textarea value={this.state.value} onChange={this.handleChange.bind(this)}/>
              <input type="submit" className="raul-button-primary" value="Send" />
            </form>
            :
            null
          }
        </div>
      </div>
    )
  }
}

export default Issue
