import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import UserData from './UserData/UserData';

class Checkout extends Component {
  state = {
    ingredients: null,
    totalPrice: 0,
  }

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
          render={() => (
            <UserData
              ingredients={this.state.ingredients}
              totalPrice={this.state.totalPrice}
              {...this.props} />
          )} />
      </div>
    );
  }
}

export default Checkout;