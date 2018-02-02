import React from 'react';
import axios from 'axios';

import {
  PrimaryButton,
  DefaultButton,
} from 'office-ui-fabric-react/lib/Button';

import {
  TextField
} from 'office-ui-fabric-react/lib/TextField';

import {
  SERVER_URI
} from '../variables/connections.js';

const createPath = '/users/create';
const removeTokenPath = '/users/me/token';
const home = 'http://localhost:3000/'

class RegistrationPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      submitted: false,
      token: ''
    }
  }

  tryAgain() {
    this.setState({
      submitted: false
    });
  }

  signOut() {
    axios.delete(SERVER_URI + removeTokenPath, {
        params: {
          token: this.state.token
        }
      })
      .then((res) => {
        this.setState({
          submitted: false,
          token: ''
        });
      })
      .catch((err) => {
        console.log("Error: signOut() - " + err.message);
      });
  }

  handleSubmit(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const username = event.target.username.value;
    const password2 = event.target.password2.value;

    if (password === password2) {
      axios.post(SERVER_URI + createPath, {
          username,
          email,
          password
        })
        .then((res) => {
          if (res) { // TODO: check if status is 200.
            console.log(res.data);
            this.setState({
              token: res.data,
              submitted: true
            });
          }
        })
        .catch((err) => {
          console.log("Error: submitInfo() - " + err.message);
          this.setState({
            submitted: true
          });
        });
    } else {
      console.log("Error: Password does not match");
    }
  }

  conditionalRender() {
    if (this.state.submitted) {
      if (!this.state.token) {
        return (
          <div>
            <p>Invalid User info. Token Not Received.</p>
            <PrimaryButton onClick={this.tryAgain.bind(this)}>Retry</PrimaryButton>
          </div>
        );
      } else {
        return (
          <div style={{background: "lightgray", boxShadow: "2px 2px 2px #888888", padding: "10px"}}>
            <p style={{width: "600px", overflowWrap: "break-word", wordWrap: "break-word"}}> New account created. </p>
            <p style={{width: "600px", overflowWrap: "break-word", wordWrap: "break-word"}}> Token received : {this.state.token} </p>
            <DefaultButton primary={true} onClick={this.signOut.bind(this)}>Sign Out</DefaultButton>
          </div>
        );
      }
    } else {
      return (
        <div>
          <p>Create Account</p>
          <form style={{width: "320px", boxShadow: "2px 2px 2px #888888", background: "lightgray", padding: "10px"}} action='' onSubmit={this.handleSubmit.bind(this)}>
            <TextField
              label='Username'
              placeholder="not secure"
              autoComplete='off'
              name='username'
            />
            <TextField
              label='Email'
              placeholder="not secure"
              autoComplete='off'
              name='email'
            />
            <TextField
              label='Password'
              placeholder="not secure"
              autoComplete='off'
              name='password'
            />
            <TextField
              label='Confirm Password'
              placeholder="not secure"
              autoComplete='off'
              name='password2'
            />
            <PrimaryButton type='submit'>Submit</PrimaryButton>
            <DefaultButton href={home}>Home</DefaultButton>
          </form>
        </div>
      );
    }
  }

  render() {
    return (
      <div style={{height: "100vh", width: "100%", display: "flex", flexFlow: "column", justifyContent: "center", alignItems: "center"}}>
        {this.conditionalRender()}
      </div>
    );
  }
}

export default RegistrationPage;