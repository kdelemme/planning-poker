import React, { Component } from "react";

class StartEstimation extends Component {
  startEstimation = () => {
    this.props.publishStartEstimationEvent();
  };

  render() {
    if (!this.props.showButton) {
      return null;
    }

    return (
      <div className="col-12 mb-3">
        <input type="button" className="btn btn-primary" onClick={this.startEstimation} value="Start estimation" />
      </div>
    );
  }
}

export default StartEstimation;
