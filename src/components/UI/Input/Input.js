import React from 'react';
import cssClasses from './Input.css';

const input = (props) => {
  let inputElement = null;
  const inputCssClasses = [cssClasses.InputElement];

  if (props.invalid && props.value) {
    inputCssClasses.push(cssClasses.Invalid);
  }

  if (props.elementType === 'input') {
    inputElement = <input
      className={inputCssClasses.join(' ')}
      {...props.elementConfig} 
      value={props.value}
      onChange={props.changed} />
  }
  else if (props.elementType === 'textarea') {
    inputElement = <textarea
      className={inputCssClasses.join(' ')}
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
