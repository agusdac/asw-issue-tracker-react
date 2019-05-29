import React, { Component } from 'react'
import axios from 'axios';
import "../css/IssueIndex.css"
import Sidebar from '../Sidebar';


export class EditComment extends Component {

  constructor(props) {
      super(props)
      this.state = {
          value: '',
          logged:'false',
          token:''
      }
  }

  componentDidMount() {
    this.setState({
        value: this.props.location.state.content,
        logged : localStorage.getItem('logged'),
        token: localStorage.getItem('uid')
       });
  }

  handleSubmit(event){
      if(this.state.logged == 'true'){
        event.preventDefault();
        var url = `https://issue-tracker-asw-ruby.herokuapp.com/issues/${this.props.match.params.id}/comments/${this.props.match.params.commentId}.json`;
        console.log(url);
        axios.put(url, {
        content: this.state.value
        }, {
        headers: {
            "accept":"*/*",
            "tokenGoogle": this.state.token,
            "Content-Type":"application/json"
        }
        } ).then(res => {
        this.props.history.push(`/issue/${this.props.match.params.id}`);
        }).catch((error)=>{
        console.log('Error: ' + error);
        });
      } else{
        this.props.history.push(`/issue/${this.props.match.params.id}`);
      }
  }

  handleChange(event){
    this.setState({value: event.target.value});
  }

  render() {
    return (
        <div>
            <div className="sidebar">
                <p>
                    <Sidebar/>
                </p>
            </div>
            <div className="body raul-body">
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <textarea value={this.state.value} onChange={this.handleChange.bind(this)}/>
                    <input type="submit" className="raul-button-primary" value="Send" />
                    </form>
            </div>
        </div>
    )
  }
  
}
export default EditComment