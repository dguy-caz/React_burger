import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import cssClasses from './CheckoutSummary.css';

const checkoutSummary = (props) => {
  return (
    <div className={cssClasses.CheckoutSummary}>
      <h1>Thank you for the order!</h1>
      <div style={{ width: '100%', margin: 'auto' }}>
        <Burger ingredients={props.ingredients} />
        <Button
          buttonType='Danger'
          clicked={props.checkoutCancelled}>CANCEL</Button>
        <Button
          buttonType='Success'
          clicked={props.checkoutConfirmed}>CONTINUE</Button>
      </div>
    </div>
  );
};

export default checkoutSummary;
