import React, { Fragment } from 'react';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients).map(ikey => {
    return (
      <li key={ikey}>
        <span style={{ textTransform: 'capitalize' }}>{ikey}</span>: {props.ingredients[ikey]}
      </li>);
  });

  return (
    <Fragment>
      <h3>Your order</h3>
      <p>Ingredients of your burger:</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p><strong>Total Price: {props.price.toFixed(2)}€</strong></p>
      <p>Continue to checkout?</p>
      <Button click={props.cancelCommand} buttonType='Danger'>CANCEL</Button>
      <Button click={props.continueCommand} buttonType='Success'>CONTINUE</Button>
    </Fragment>
  );
};

export default orderSummary;
