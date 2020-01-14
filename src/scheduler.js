import React, { Component } from "react";
import { API } from "aws-amplify";
import { Storage } from "aws-amplify";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Archivo from "./archivo";
import ReactLoading from 'react-loading';
import { Alert } from "react-bootstrap";



class scheduler extends Component {
  constructor() {
    super();
    this.state = {
      isLoading : true,
      data: [],
      response :''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  processFile = async () => {
    console.log("called method");
    this.setState({ isLoading: true});
    const response = await API.post("api67d3d882", "/mlload");
    console.log(response)
    this.setState({isLoading:false, response: response.message, calledWithSuccess : true});
    console.log(this.state);
  }
  

  handleSubmit(e){
    e.preventDefault();    
    this.setState({
        isLoading : true          
    })                
    console.log("enviado Form");
    this.processFile();
  }

  getFileList() {
    Storage.list("", { level: "public" })
      .then(result => {
        const filtrado = result.filter( result => result.key.endsWith(".csv") )
        filtrado.shift();
        filtrado.sort();
        filtrado.reverse();
        this.setState({
          data: filtrado,
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
        {this.state.calledWithSuccess ? <Alert variant="success" dismissible>Successfully scheduled sagemake job, you will be notified via e-mail on the status</Alert> : ''}
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
