import React, { Component } from "react";
import { Storage } from "aws-amplify";
import ReactLoading from "react-loading";
import ReactPlayer from "react-player";
import Card from "react-bootstrap/Card";
import CardColumns from "react-bootstrap/CardColumns";

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
        console.log(result);
        const filtrado = result.filter(result => result.key.endsWith(".m3u8"));
        filtrado.shift();
        filtrado.sort();
        filtrado.reverse();
        this.setState({
          data: filtrado,
          isLoading: false
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    console.log(this.state.data);

    const fileList = this.state.data.map(archivo => (
      <Card className="text-center">
        <Card.Body>
          <Card.Title>{archivo.key.replace("videos/", "")}</Card.Title>

          <ReactPlayer
            key={archivo.key}
            url={"https://d1qbcdoydtv3t1.cloudfront.net/" + archivo.key}
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
