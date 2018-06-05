import React, { Component } from "react";

class Name extends Component {
  state = { name: "" };
  handleChange = event => {
    this.setState({ name: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.publishChangeNameEvent(this.state.name);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="col-12">
        <label>
          Your name: <input type="text" value={this.state.name} onChange={this.handleChange} />
        </label>
      </form>
    );
  }
}

export default Name;
