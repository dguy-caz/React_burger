import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
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
    let checkoutSummary = <Redirect to='/' />;
    if (this.props.ingredients) {
      const  redirectAfterPurchase = this.props.purchased ? <Redirect to='/orders' /> : null;
      checkoutSummary = (
        <div>
          {redirectAfterPurchase}
          <CheckoutSummary
            ingredients={this.props.ingredients}
            checkoutCancelled={this.checkoutCancelHandler}
            checkoutConfirmed={this.checkoutConfirmHandler} />
          <Route
            path={this.props.match.path + '/contact-data'}
            component={UserData} />
        </div>
      )
    }
    return checkoutSummary;
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  };
};

export default connect(mapStateToProps)(Checkout);