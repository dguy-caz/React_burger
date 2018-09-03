import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import UserData from './UserData/UserData';

class Checkout extends Component {

  componentWillMount() {
    this.setState({ ...this.props.history.location.state });
  }

  checkoutCancelHandler = () => {
    this.props.history.goBack();
  }

  checkoutConfirmHandler = () => {
    this.props.history.replace('checkout/contact-data');
  }

  render() {
    let checkoutSummary = null;
    if (this.state.ingredients)
      checkoutSummary = <CheckoutSummary
        ingredients={this.state.ingredients}
        checkoutCancelled={this.checkoutCancelHandler}
        checkoutConfirmed={this.checkoutConfirmHandler} />
    else
      checkoutSummary = <h3 
      style={{ textAlign: 'center' }}>Your burger is empty, please choose your ingredients again</h3>

    return (
      <div>
        {checkoutSummary}
        <Route
          path={this.props.match.path + '/contact-data'}
          component={UserData} />
      </div>
    );
  }
}

export default Checkout;