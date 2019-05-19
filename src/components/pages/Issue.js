import React, { Component } from 'react'
import axios from 'axios';
import moment from 'moment';
import { Link } from 'react-router-dom';

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

  render() {
    return (
      <div>
        <Link to="/">Home</Link>
        <h1>#{this.state.issue.id} {this.state.issue.title}</h1>
        <p>{this.state.issue.description}</p>
        <hr></hr>
        <p>Kind: {this.state.issue.kind}</p>
        <p>Priority: {this.state.issue.priority}</p>
        <p>Status: {this.state.issue.status}</p>
      </div>
    )
  }
}

export default Issue
