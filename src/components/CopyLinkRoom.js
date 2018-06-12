import React, { Component } from "react";
import copy from "copy-to-clipboard";

class CopyRoomLink extends Component {
  state = { clicked: false };

  handleClick = event => {
    event.preventDefault();
    copy(window.location.href);
    this.setState({ clicked: true });
    setTimeout(() => this.setState({ clicked: false }), 2000);
  };

  render() {
    const clicked = this.state.clicked;
    return (
      <button type="button" className="btn btn-secondary btn-sm" onClick={this.handleClick} disabled={clicked}>
        {clicked && <span>Copied!</span>}
        {!clicked && <span>Copy link</span>}
      </button>
    );
  }
}

export default CopyRoomLink;
