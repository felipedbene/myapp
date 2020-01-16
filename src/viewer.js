import React, { Component } from "react";
import { Storage } from "aws-amplify";
import ReactLoading from "react-loading";
import ReactPlayer from "react-player";
import Card from "react-bootstrap/Card";
import CardColumns from "react-bootstrap/CardColumns";
import Image from 'react-bootstrap/Image'

class viewer extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      data: []
    };
  }

  getFileList() {
    Storage.list("videos/", { level: "public" })
      .then(result => {
        console.log("Result")
        console.log(result);
        this.setState({
          data: result,
          isLoading: false
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    console.log("Data Follows");
    console.log(this.state.data);
    let out = this.state.data.filter( data => data.key.endsWith("m3u8"))
    const fileList = out.map(archivo => (
      <Card className="text-center">
        <Card.Body>
          <Card.Title>{archivo.key.replace("videos/", "")}</Card.Title>

          <ReactPlayer
            key={archivo.key}
           // url={"http://d1qbcdoydtv3t1.cloudfront.net/" + archivo.key}
            url={"/" + archivo.key}
            width="100%"
            height="100%"
            controls
          />

        </Card.Body>
      </Card>
    ));
    // Static rendering for testing
    //const fileList = <ReactPlayer url="https://d1qbcdoydtv3t1.cloudfront.net/videos/FELIPO.m3u8" controls />
    return (
      <div>
        <p>
          The videos below were simulations rendered from VRP SageMaker Model
          <Image src="/imgs/flow3.png" alt="Flow" fluid/> </p>
        {this.state.isLoading ? (
          <ReactLoading type="spin" color="#FFA500" />
        ) : (
          <CardColumns>{fileList}</CardColumns>
        )}
      </div>
    );
  }

  componentDidMount() {
    this.getFileList();
  }
}

export default viewer;
