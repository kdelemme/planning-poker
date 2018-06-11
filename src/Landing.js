import React, { Component } from "react";
import Input from "./Input";

class Landing extends Component {
  state = {};

  handleSubmit = event => {
    event.preventDefault();
    this.props.handleSubmit(this.state);
  };

  handleNameChange = value => this.setState({ name: value });
  handleRoomIdChange = value => this.setState({ roomId: value });

  render() {
    const { name, roomId } = this.state;
    return (
      <div className="container">
        <div className="row mt-3">
          <div className="col-12 col-sm-3">
            <form>
              <Input placeholder="Your name" handleChange={this.handleNameChange} />
              <Input placeholder="Room ID" handleChange={this.handleRoomIdChange} />
              <button disabled={!name || !roomId} className="btn btn-primary" type="submit" onClick={this.handleSubmit}>
                Join the planning poker room
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
