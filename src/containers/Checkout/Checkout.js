import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import UserData from './UserData/UserData';
import { connect } from 'react-redux';

class Checkout extends Component {
  checkoutCancelHandler = () => {
    this.props.history.goBack();
  }

  checkoutConfirmHandler = () => {
    this.props.history.replace('checkout/contact-data');
  }

  render() {
    let checkoutSummary = null;
    if (this.props.ingredients)
      checkoutSummary = <CheckoutSummary
        ingredients={this.props.ingredients}
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

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients
  }
};

export default connect(mapStateToProps)(Checkout);