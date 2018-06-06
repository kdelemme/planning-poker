import React, { Component } from "react";

class Name extends Component {
  state = { name: "" };
  handleChange = event => {
    this.setState({ name: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.handleChange(this.state.name);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="col-12">
        <div className="form-group">
          <input
            type="text"
            class="form-control"
            placeholder="Your name"
            value={this.state.name}
            onChange={this.handleChange}
          />
        </div>
      </form>
    );
  }
}

export default Name;
