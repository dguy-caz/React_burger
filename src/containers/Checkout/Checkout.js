import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
  state = {...this.props.history.location.state} 

  checkoutCancelHandler = () => {
    this.props.history.goBack();
  }

  checkoutConfirmHandler = () => {
    this.props.history.replace('checkout/contact-data');
  }

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutCancelled={this.checkoutCancelHandler}
          checkoutConfirmed={this.checkoutConfirmHandler} />
      </div>
    );
  }
}

export default Checkout;