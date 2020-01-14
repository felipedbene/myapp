import React, { Component } from "react";

class Movie extends Component {
  render() {
    console.log(this.props);
    return <source src={this.props.fileName.toString()} type="video/mp4" />;
  }
}

export default Movie;
