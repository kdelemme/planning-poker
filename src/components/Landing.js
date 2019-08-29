import React, { useState } from "react";
import Input from "./Input";
import AnalyticsService from "../analytics-service";

function Landing(props) {
  const [name, setName] = useState(props.name);
  const [room, setRoom] = useState(props.room);

  const handleSubmit = event => {
    event.preventDefault();
    AnalyticsService.track("Room Joined", { name, room });
    props.handleSubmit({ name, room });
  };

  return (
    <div className="container">
      <div className="row mt-3">
        <div className="mx-auto col-12 col-sm-6 col-lg-4">
          <form>
            <Input placeholder="Jone" label="Your name" value={name} handleChange={setName} />
            <Input
              label="Room"
              placeholder="transferwise-planning"
              value={room}
              handleChange={setRoom}
              disabled={props.room}
            />
            <button
              disabled={!name || !room}
              className="btn btn-primary col-12"
              type="submit"
              onClick={handleSubmit}
            >
              Join the planning poker room
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Landing;
