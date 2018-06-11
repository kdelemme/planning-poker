import React, { Component } from "react";
import Input from "./Input";

class Landing extends Component {
  state = { name: this.props.name, roomId: this.props.roomId };

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
          <div className="mx-auto col-12 col-sm-6 col-lg-4">
            <form>
              <Input placeholder="Your name" value={name} handleChange={this.handleNameChange} />
              <Input
                placeholder="Room ID"
                value={roomId}
                handleChange={this.handleRoomIdChange}
                disabled={this.props.roomId}
              />
              <button
                disabled={!name || !roomId}
                className="btn btn-primary col-12"
                type="submit"
                onClick={this.handleSubmit}
              >
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
