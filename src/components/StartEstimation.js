import React from "react";

function StartEstimation(props) {
  const startEstimation = () => {
    props.handleStartEstimation();
  };

  const { show, disabled } = props;
  if (!show) {
    return null;
  }

  return (
    <div class="card p-2">
      <input
        type="button"
        className="btn btn-primary"
        onClick={startEstimation}
        value="Start new game"
        disabled={disabled}
      />
    </div>
  );
}

export default StartEstimation;
