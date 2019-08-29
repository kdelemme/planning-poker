import React, { useState } from "react";
import copy from "copy-to-clipboard";
import AnalyticsService from "../analytics-service";

function CopyRoomLink() {
  const [clicked, setClicked] = useState(false);

  const handleClick = event => {
    event.preventDefault();
    copy(window.location.href);
    setClicked(true);
    setTimeout(() => setClicked(false), 2000);
    AnalyticsService.track("Room Link Clicked", { link: window.location.href });
  };

  return (
    <button type="button" className="btn btn-secondary btn-sm" onClick={handleClick} disabled={clicked}>
      {clicked && <span>Copied!</span>}
      {!clicked && <span>Copy link</span>}
    </button>
  );
}

export default CopyRoomLink;
