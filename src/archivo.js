import React, {Component} from 'react';

class Archivo extends Component {
    
    render(){
        console.log(this.props)
        return(<option>{this.props.fileName.toString()}</option>);
    }
}

export default Archivo;