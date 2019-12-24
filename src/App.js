import React,{Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react'; 

import {BrowserRouter, Route, Switch, Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavLink from 'react-bootstrap/NavLink';

Amplify.configure(awsconfig);

class App extends Component {
  render(){
    return (
      <div>
        <Header />
      </div>
    );
  }

}
export default withAuthenticator(App, true);

class Header extends Component{
  render(){
    return (      
        <BrowserRouter>
          <div> 

<Navbar bg="dark" variant="dark">
  <Navbar.Brand href="#home">Oktank</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link as={Link} to="/">Home</Nav.Link>
      <Nav.Link as={Link} to="#">MS SQL Load</Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>
                        
            <Switch>            
              <Route exact path="/" component={Home} />             
              <Route path="/*" component={NotFound} />                       
            </Switch>   
          </div>  
        </BrowserRouter>              
    )
  }
}

class NotFound extends Component {
  render(){
    return <div>Not Found</div>
  }
}

class Home extends Component {
  render(){
    return (
      <div>
        Home        
      </div>
    )
  }
}