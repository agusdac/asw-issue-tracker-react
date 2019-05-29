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
      name:''
    }
  }

  getLocalStorage() {
    const tokenlocal = localStorage.getItem('uid');
    this.setState({token: tokenlocal,
       userId:localStorage.getItem('userId'),
       name: localStorage.getItem('name')
      }, () => console.log('State/Token: ' + this.state.token + 'State/UserId: ' + this.state.userId));
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

  }

  voteIssue(){

  }

  removeWatch(){

  }

  watchIssue(){
    
  }

  render() {
    return (
      <div className="index">
        <div className="sidebar">
          <p>
            <Sidebar/>
          </p>
        </div>
        <div className="body">
          <span className="raul-user-name">{this.state.name} <span className="raul-not-bold">created an issue:</span> </span>
          <span className="raul-time-ago raul-not-bold">{moment(this.state.issue.created_at).fromNow()}</span>
          <br></br>
          <span className="raul-issue-title">#{this.state.issue.id} {this.state.issue.title}</span>
          <span className="raul-title-status">{this.state.issue.status}</span>
          
          <p className="raul-not-bold">{this.state.issue.description}</p>
          <hr></hr>
          <p>Kind: {this.state.issue.kind}</p>
          <p>Priority: {this.state.issue.priority}</p>
          <p>Status: {this.state.issue.status}</p>
          <p>Votes: 
            { this.hasUserVoted() ?
            <span>
              <span className="raul-counter-active">{undefined !== this.state.issue.votes ? this.state.issue.votes.length : 0}</span>
              <span className="raul-like-a-link" onClick={this.removeVote}>Remove vote</span>
            </span>
            :
            <span>
              <span className="raul-counter-inactive">{undefined !== this.state.issue.votes ? this.state.issue.votes.length : 0}</span>
              <span className="raul-like-a-link" onClick={this.voteIssue}>Vote this issue</span>
            </span>
            }
          </p>
          <p>Watches: 
            { this.hasUserWatched() ?
            <span>
              <span className="raul-counter-active">{undefined !== this.state.issue.watches ? this.state.issue.watches.length : 0}</span>
              <span className="raul-like-a-link" onClick={this.removeWatch}>Unwatch this issue</span>
            </span>
            :
            <span>
              <span className="raul-counter-inactive">{undefined !== this.state.issue.watches ? this.state.issue.watches.length : 0}</span>
              <span className="raul-like-a-link" onClick={this.watchIssue}>Watch this issue</span>
            </span>
            }
          </p>
          <hr></hr>
          <p>Comments ({undefined !== this.state.issue.comments ? this.state.issue.comments.length : 0})</p>
          {undefined !== this.state.issue.comments ? this.state.issue.comments.map(comment =>
            <p>{comment.content} - {moment(comment.created_at).fromNow()}
            {(this.state.userId == comment.userId) ? <Link to={`/issue/${this.state.issue.id}/comments/${comment.id}/edit`}>Edit</Link>
            : null}
            </p>
          ) : null}
          <form onSubmit={this.handleSubmit.bind(this)}>
              <textarea value={this.state.value} onChange={this.handleChange.bind(this)}/>
            <input type="submit" value="Send" />
          </form>
        </div>
      </div>
    )
  }
}

export default Issue
