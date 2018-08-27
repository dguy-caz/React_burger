import React from 'react';
import Control from './Control/Control'
import cssClasses from './Controls.css'

const controlsArray = [
  {label: 'Salad', type: 'salad'},
  {label: 'Bacon', type: 'bacon'},
  {label: 'Cheese', type: 'cheese'},
  {label: 'Meat', type: 'meat'}
];

const controls = (props) => (
  <div className={cssClasses.Controls}>
    {controlsArray.map(ctrl => (
      <Control
        key={ctrl.label}
        label={ctrl.label}
        added ={() => props.ingredientAdded(ctrl.type)} />
    ))}
  </div>
);

export default controls;
