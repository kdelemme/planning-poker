import React, { useState } from "react";

function Input(props) {
  const [value, setValue] = useState(props.value);

  const handleChange = event => {
    setValue(event.target.value);
    props.handleChange(event.target.value);
  };

  return (
    <div className="form-group">
      <label>{props.label}</label>
      <input
        type="text"
        className="form-control"
        placeholder={props.placeholder}
        value={value}
        onChange={handleChange}
        disabled={props.disabled}
      />
    </div>
  );
}

export default Input;
