import React from 'react';

export default (props) => {
  console.log("props", props);
  let { input, label, type, autoFocus, meta: { touched, error, warning } } = props;
  console.log("input", input);
  return (
    <div className="form-group">
      <label>{label}</label>
      <div className="form-group">
        <input
          {...input}
          type={type}
          className="form-control"
          value={input.value}
          autoFocus={autoFocus}
        />
        {touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span>{warning}</span>))}
      </div>
    </div>
  )
}