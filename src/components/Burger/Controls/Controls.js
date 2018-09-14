import React from 'react';
import Control from './Control/Control';
import cssClasses from './Controls.css';

const controlsArray = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' }
];

const controls = (props) => (
  <div className={cssClasses.Controls}>
    <p style={{ fontSize: '19px'}}>Current price: <strong>{props.price.toFixed(2)}</strong>€</p>
    {controlsArray.map(ctrl => (
    <Control
      key={ctrl.label}
      label={ctrl.label}
      added={() => props.ingredientAdded(ctrl.type)}
      removed={() => props.ingredientRemoved(ctrl.type)}
      disabled={props.disabled[ctrl.type]} />
  ))
}
<button
  className={cssClasses.OrderButton}
  disabled={!props.purchasable}
  onClick={props.ordered}>{props.isAuth ? 'ORDER NOW' : 'SIGN IN TO ORDER'}</button>
  </div >
);

export default controls;
