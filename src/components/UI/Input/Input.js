import React from 'react';
import cssClasses from './Input.css';

const input = (props) => {
  let inputElement = null;
  if (props.elementType === 'input') {
    inputElement = <input
      className={cssClasses.InputElement}
      {...props.elementConfig} 
      value={props.value}
      onChange={props.changed} />
  }
  else if (props.elementType === 'textarea') {
    inputElement = <textarea
      className={cssClasses.InputElement}
      {...props.elementConfig}
      value={props.value}
      onChange={props.changed} />
  }

  return (
    <div className={cssClasses.Input}>
      <label className={cssClasses.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default input;
