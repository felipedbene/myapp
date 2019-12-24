import React, { Component } from "react";
import Amplify from "aws-amplify";
import awsconfig from "./aws-exports";
import { withAuthenticator } from "aws-amplify-react";

import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavLink from "react-bootstrap/NavLink";
import sqlFetcher from "./sqlFetcher";

Amplify.configure(awsconfig);

class App extends Component {
  render() {
    return (
      <div>
        <Header />
      </div>
    );
  }
}
export default withAuthenticator(App, true);

class Header extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">Oktank Logistics</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/getSQL">
                  Data Load
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>

          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/getSQL" component={sqlFetcher} />
            <Route path="/*" component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

class NotFound extends Component {
  render() {
    return <div>Not Found</div>;
  }
}

class Home extends Component {
  render() {
    return ( <div><h1>Vehicle Routing Problem</h1>
    <p> This a Proof of Concept (POC) frontend to allow users to load data from the legacy system (MS SQL 2012 Based). 
    The idea is to add Machine Learning capabilities to an old application in a complete serverless way.
    </p>
    <h3>Problem statement</h3>
      <img src="/imgs/Model.png" class="img-fluid rounded mx-auto d-block" alt="Graphical Problem Definition" />
    
    <p>Based on that list of vehicles that have to be delivered, this data is fed into <abbr title="S3 Bucket"> sm-input-bucket</abbr> where all the process start.
      Having that data in that bucket, <abbr title="lambda function">runModel.py</abbr> function is triggered. This function has two main objectives :
      Update the state table on <abbr title="Key-value pair database">Dynamo DB</abbr> with vehicles involved in the Sage Maker Job and trigger it.
      Send that data to a S3 Bucket to allow a Amazon Sage Maker to calculate the best delivery route using Machine Learning.
      Results can be seen here.</p>
      <p>Once Machine Learning has finished running, the user can see a rendered image with the best-rewarded route.</p>
  <p>This can be best depicted in this diagram : 
      <img src="/imgs/arquitecture.png" class="img-fluid rounded mx-auto d-block" alt="architecture" />
  </p></div>);
  }
}