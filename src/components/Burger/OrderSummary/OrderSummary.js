import React, { Fragment } from 'react';

const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients).map(ikey => {
    return (
      <li key={ikey}>
        <span style={{ textTransform: 'capitalize' }}>{ikey}</span>: {props.ingredients[ikey]}
      </li> );
  });

  return (
    <Fragment>
      <h3>Your order</h3>
      <p>Ingredients of your burger:</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p>Continue to checkout?</p>
    </Fragment>
  );
};

export default orderSummary;
