import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import cssClasses from './CheckoutSummary.css';

const checkoutSummary = (props) => {
  let burger = null;
  if (!props.hideBurger) {
    burger = <div style={{ width: '100%', height: '50%', position: 'absolute' }}>
      <Burger ingredients={props.ingredients} changeStyle={true} />
      <Button
        buttonType='Danger'
        click={props.checkoutCancelled}>CANCEL</Button>
      <Button
        buttonType='Success'
        click={props.checkoutConfirmed}>CONTINUE</Button>
    </div>
  }
  return (
    <div className={cssClasses.CheckoutSummary}>
      <h1>Thank you for your order!</h1>
      {burger}
    </div>
  );
};

export default checkoutSummary;
