import React, { Component } from 'react';

class ListItem extends Component {

    constructor(props) {
	super(props);
	this.state = { color: 'black' };
    }

    handleClick() {
        this.setState(prevState =>{
            let color = this.state.color;

            if(color === 'black')
                return{color:'gray'}
            else
                return{color:'black'}
        })
    }

  render() {
    let item = this.props.item;
    let name = item.name;

    return (
	    <span onClick={this.handleClick.bind(this)} style={{color: this.state.color}}>
        <strong>{name}</strong>
      </span>
    );

  }

}
export default ListItem;

