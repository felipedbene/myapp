import React, { Component } from "react";
import { API } from "aws-amplify";
import Button from 'react-bootstrap/Button';
import { Alert } from "react-bootstrap";

class sqlFetcher extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      calledWithSuccess : false,
      response: ''
    };
  }

  getSQLData = async (res) => {
    console.log("called method");
    this.setState({ isLoading: true});
    const response = await API.get("getCarsA", "/getvh");
    this.setState({isLoading:false, response: response.message, calledWithSuccess : true});
    console.log(this.state);

  };

  render() {

    return (
      <div>
        <h3>Let's load some data !</h3>
        <p>
          The following button will do a query on MS SQL Server in the 
          <abbr>civar_ford</abbr> Database into our Bucket for later processing.<br />
          <img src="/imgs/loadFlow.png" alt="Flow"/>
          <br />
          <Button
      variant="warning"
      disabled={this.state.isLoading}
      onClick={!this.state.isLoading ? this.getSQLData : null}
     >
      {this.state.isLoading ? ('Loading…') : ('Click to reload')}
    </Button>{this.state.calledWithSuccess ? <Alert variant="success">{this.state.response}</Alert> : ''}
        </p>
      </div>
    );
  }
}

export default sqlFetcher;
