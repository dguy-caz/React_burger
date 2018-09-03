import React from 'react';
import cssClasses from './Order.css';

const order = (props) => (
  <div className={cssClasses.Order}>
    <p>ingredients</p>
    <p>price</p>
  </div>

);

export default order;
