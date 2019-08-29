import React, { useState } from "react";
import { addUrlProps, replaceInUrlQuery } from "react-url-query";

import Landing from "./Landing";
import PlanningPokerRoom from "./PlanningPokerRoom";

function App(props) {
  const [name, setName] = useState("");
  const [room, setRoom] = useState(props.room);

  const handleSubmit = ({ name, room }) => {
    setName(name);
    setRoom(room);
    props.onChangeRoom(room);
  };

  return (
    <>
      {(!room || !name) && <Landing room={room} name={name} handleSubmit={handleSubmit} />}
      {room && name && <PlanningPokerRoom room={room} name={name} />}
    </>
  );
}

const mapUrlToProps = (url, props) => ({ room: url.room });
const mapUrlChangeHandlersToProps = props => ({ onChangeRoom: value => replaceInUrlQuery("room", value) });

export default addUrlProps({ mapUrlToProps, mapUrlChangeHandlersToProps })(App);

