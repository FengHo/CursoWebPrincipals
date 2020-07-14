import React, { Component } from 'react';
import List from './List.js';
const uuidv4 = require('uuid');

class Lists extends Component {

  render() {
    // If there are no lists, display a relevant message
    if(this.props.lists.length === 0) {
      return (
        <div id="listsDiv" className="List">
          <h2>Add new lists to get started!</h2>
        </div>
      );
    }

    // Otherwise, for each list, create a div
    let items = this.props.items;
    let lists = this.props.lists;
    console.log(lists);
    let addItem = this.props.addItem;
    return (
      <div key={uuidv4()}>
      {lists.map(function(listName) {
        return (
          <List name={listName} items={items[listName]} addItem={addItem.bind(this)} key={uuidv4()} />
        )
      })}
      </div>
    );
  }
}

export default Lists;
