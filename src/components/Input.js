import React, { Component } from "react";

class Input extends Component {
  state = { value: this.props.value };

  handleChange = event => {
    this.setState({ value: event.target.value });
    this.props.handleChange(event.target.value);
  };

  render() {
    return (
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder={this.props.placeholder}
          value={this.state.value}
          onChange={this.handleChange}
          disabled={this.props.disabled}
        />
      </div>
    );
  }
}

export default Input;
