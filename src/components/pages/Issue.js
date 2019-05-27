import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Sidebar from '../Sidebar';

export class Issue extends Component {

  state = {
    issue:{}
  }

  componentDidMount() {
    axios.get(`https://issue-tracker-asw-ruby.herokuapp.com/issues/${this.props.match.params.id}.json`)
      .then(res => {
        const issue = res.data;
        this.setState({ issue });
      })
  }

  handleSubmit(event){

  }

  render() {
    return (
      <div>
        <div className="index">
          <div className="sidebar">
            <p>
              <Sidebar/>
            </p>
          </div>
        </div>
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
        <form onSubmit={this.handleSubmit}>
            <textarea/>
          <input type="submit" value="Send" />
        </form>
      </div>
    )
  }
}

export default Issue
