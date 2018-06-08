import React, { Component } from "react";

class Input extends Component {
  state = { value: "" };

  handleChange = event => {
    this.setState({ value: event.target.value });
    this.props.handleChange(event.target.value);
  };

  render() {
    return (
      <div className="form-group">
        <input
          type="text"
          class="form-control"
          placeholder={this.props.placeholder}
          value={this.state.value}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default Input;
