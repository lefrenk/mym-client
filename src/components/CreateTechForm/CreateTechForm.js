import React from 'react';

import axios from 'axios';

import {
  DEV_SERVER_URI
} from '../../variables/connections.js';

const createTechPath = 'techs/create';

const pageStyle = {
  width: "46%",
  background: "#313e6d",
  boxShadow: "0px 0px 5px 2px #18192F",
  border: "2px solid #48578e",
  padding: "20px"
};

const textStyle = {
  color: "white"
};

const buttonStyle = {
  background: "#DFAE3B",
  color: "#18192F"
};

const inputStyle = {
  background: "#18192F",
  border: "0px solid",
  outline: "none",
  color: "white"
};

const containerStyle = {
  width: "100%",
  display: "flex",
  flexFlow: "column",
  alignItems: "center"
};

class CreateTechForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      description: '',
      source: '',
      type: '',
      category: '',
      tags: '',
      tech: '',
      submitted: false
    }
  }

  handleRetry() {
    this.setState({
      submitted: false,
      tech: ''
    });
  }

  handleChange(event) {
    event.preventDefault();
    let obj = {};
    obj[event.target.name] = event.target.value;
    this.setState(obj);
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log("CreateTechForm handleSubmit()");
    axios.post(DEV_SERVER_URI + createTechPath, {
        name: this.state.name,
        description: this.state.description,
        source: this.state.source,
        type: this.state.type,
        category: this.state.category,
        tags: this.state.tags
      })
      .then((res) => {
        this.setState({
          tech: res.data,
          submitted: true
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  conditionalRender() {
    if (this.state.submitted) {
      return (
        <div style={containerStyle}>
          <h2 style={textStyle}>Tech Submission Complete</h2>
          <p style={textStyle}>{this.state.tech.name} was submitted</p>
          <button onClick={this.handleRetry.bind(this)} style={buttonStyle}>New Tech</button>
        </div>
      );
    } else {
      return (
        <div style={containerStyle}>
          <h2 style={textStyle}>Create Tech Form</h2>
          <form style={containerStyle}>
            <p style={textStyle}>Name </p>
            <input type="text" name="name" onChange={this.handleChange.bind(this)} value={this.state.name} style={inputStyle}/>
            <p style={textStyle}>Description </p>
            <input type="text" name="description" onChange={this.handleChange.bind(this)} value={this.state.description} style={inputStyle}/>
            <p style={textStyle}>Source </p>
            <input type="text" name="source" onChange={this.handleChange.bind(this)} value={this.state.source} style={inputStyle}/>
            <p style={textStyle}>Type</p>
            <input type="text" name="type" onChange={this.handleChange.bind(this)} value={this.state.type} style={inputStyle}/>
            <p style={textStyle}>Category </p>
            <input type="text" name="category" onChange={this.handleChange.bind(this)} value={this.state.category} style={inputStyle}/>
            <p style={textStyle}>Tags </p>
            <input type="text" name="tags" onChange={this.handleChange.bind(this)} value={this.state.tags} style={inputStyle}/>
            <button style={buttonStyle} onClick={this.handleSubmit.bind(this)}>Submit</button>
          </form>
        </div>
      );
    }
  }

  render() {
    // #28294f
    return (
      <div style={pageStyle}>
        {this.conditionalRender()}
      </div>
    );
  }
}

export default CreateTechForm;
