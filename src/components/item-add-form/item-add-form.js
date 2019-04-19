import React, { Component } from "react";
import "./item-add-form.css";

export default class AddForm extends Component {
  state = {
    label: ""
  };

  onLabelChange = e => {
    console.log(e.target.value);
    this.setState({
      label: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.onItemAdded(this.state.label);
    this.setState({
      label: ""
    });
  };

  render() {
    return (
      <form className="add-form" onSubmit={this.onSubmit}>
        <input
          type="text"
          className="form-control search-input add-form-input"
          placeholder="Add new task"
          onChange={this.onLabelChange}
          value={this.state.label}
        />
        <button className="btn btn-outline-info add-button">Add task</button>
      </form>
    );
  }
}
