import React, { Component } from 'react'


export class EditComment extends Component {

  constructor(props) {
      super(props)
      this.state = {
      image : "",
      name : "",
      token : "",
      url: "",
      email: "",
      logged : "false",
      userId: "",    
      }
  }


  render() {
    return (
      <div>
          Hola
      </div>
    )
  }
  
}
export default EditComment