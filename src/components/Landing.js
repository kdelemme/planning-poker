import React, { Component } from "react";
import Input from "./Input";
import AnalyticsService from "../analytics-service";

class Landing extends Component {
  state = { name: this.props.name, room: this.props.room };

  handleSubmit = event => {
    event.preventDefault();
    AnalyticsService.track("Room Joined", this.state);
    this.props.handleSubmit(this.state);
  };

  handleNameChange = value => this.setState({ name: value });
  handleRoomChange = value => this.setState({ room: value });

  render() {
    const { name, room } = this.state;
    return (
      <div className="container">
        <div className="row mt-3">
          <div className="mx-auto col-12 col-sm-6 col-lg-4">
            <form>
              <Input placeholder="Jone" label="Your name" value={name} handleChange={this.handleNameChange} />
              <Input
                label="Room"
                placeholder="transferwise-planning"
                value={room}
                handleChange={this.handleRoomChange}
                disabled={this.props.room}
              />
              <button
                disabled={!name || !room}
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
