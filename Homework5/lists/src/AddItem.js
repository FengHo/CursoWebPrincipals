import React, { Component } from 'react';

class AddItem extends Component {

  constructor() {
    super();
    this.state = {
      newItem:{},
    }
  }

  handleSubmit(e) {
      e.preventDefault();

      this.setState({newItem : {name: this.refs.id.value}}, () =>
      {this.props.addItem({list: this.props.idName, item:this.state.newItem});
      });

      this.setState({input:""});
  }
    

  render() {
    let divName = 'add' + this.props.idName;
    return (
      <div className='addItemDiv'>
      <h4>Add {this.props.idName}</h4>
      <form ref='form' onSubmit={this.handleSubmit.bind(this)}>
      <div id={divName} ref={divName}>
        <label>Name</label><br />
        <input type='text' ref='id'/>
        </div>
        <br />
        <input type='submit' value='Submit' />
        <br />
      </form>
      </div>
    );
  }

}

export default AddItem;
