import React, { Component } from "react";
import Amplify, { API } from "aws-amplify";
import { Loading } from "aws-amplify-react";
import Button from 'react-bootstrap/Button';

class sqlFetcher extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      response: ""
    };
    this.getSQLData();
  }

  getSQLData = async () => {
    const response = await API.get("getCarsA", "/getvh");
    this.setState({ isLoading: true, response: response.data.message });
    alert(JSON.stringify(response, null, 2));
  };

  render() {
    const message = this.state.response;

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
      {this.state.isLoading ? 'Loading…' : 'Click to load'}
    </Button>
        </p>
      </div>
    );
  }
}

export default sqlFetcher;
