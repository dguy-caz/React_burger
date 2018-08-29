import React from 'react';
import cssClasses from './Control.css';

const control = (props) => (
  <div className={cssClasses.Control}>
    <div className={cssClasses.Label}>{props.label}</div>
    <button
      className={cssClasses.Less}
      onClick={props.removed}
      disabled={props.disabled}>Less</button>
    <button
      className={cssClasses.More}
      onClick={props.added}>More</button>
  </div>
);

export default control;
