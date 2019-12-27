import React, { Component } from "react";
import { Storage } from "aws-amplify";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Archivo from "./archivo";
import ReactLoading from 'react-loading';


class scheduler extends Component {
  constructor() {
    super();
    this.state = {
      isLoading : true,
      data: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  processFile() {
    console.log("bla");
  }

  handleSubmit(e){
    e.preventDefault();    
    this.setState({
        isLoading : true          
    })                
    console.log("enviado Form");  
  }

  getFileList() {
    Storage.list("", { level: "public" })
      .then(result => {
        result.shift();
        result.sort();
        result.reverse();
        this.setState({
          data: result,
          isLoading : false
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    const fileList = this.state.data.map(archivo => (
      <Archivo key={archivo.key} fileName={archivo.key} />
    ));

    return (
      <div>
        <h1>Welcome to Machine Learning!</h1>
        <h4>Selecting a file and clicking submit will trigger a Job in SageMaker to Calcute the route</h4>
        {this.state.isLoading ? (               
             <ReactLoading type="spin" color="#FFA500" /> 
) : (<Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="fileNameSelector">
            <Form.Label>
              Please choose a file for processing.
            </Form.Label>
            <Form.Control as="select">{fileList}</Form.Control>
          </Form.Group>
          <Button variant="warning" type="submit">
            Send
          </Button>
        </Form>)}
      </div>
    );
  }

  componentDidMount(){
      this.getFileList()
  }
}
export default scheduler;
