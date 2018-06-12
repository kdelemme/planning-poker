import React, { Component } from "react";

class StartEstimation extends Component {
  startEstimation = () => {
    this.props.handleStartEstimation();
  };

  render() {
    const { show, disabled } = this.props;
    if (!show) {
      return null;
    }

    return (
      <div class="card p-2">
        <input
          type="button"
          className="btn btn-primary"
          onClick={this.startEstimation}
          value="Start new game"
          disabled={disabled}
        />
      </div>
    );
  }
}

export default StartEstimation;
