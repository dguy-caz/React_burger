import React, { Component, Fragment } from 'react';
import axios from '../../axiosOrders';
import Burger from '../../components/Burger/Burger';
import Controls from '../../components/Burger/Controls/Controls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import errorHandler from '../../hoc/ErrorHandler/ErrorHandler';
import { connect } from 'react-redux';
import * as actionCreators from '../../Store/actions/index';

class BurgerBuilder extends Component {

  state = {
    commandOrdered: false
  }

  componentDidMount() {
    this.props.initIngredients();
  }

  toggleSummaryHandler = () => {
    this.setState({ commandOrdered: true });
  }

  cancelCommandHandler = () => {
    this.setState({ commandOrdered: false });
  }

  continueCommandHandler = () => {
    this.props.history.push({pathname: '/checkout'});
  }


  render() {

    let burger = this.props.error ? <p style={{ textAlign: 'center' }}>The ingredients can't be loaded...</p> : <Spinner />;
    let orderSummary = null;

    if (this.props.ingredients) {
      const disableClick = { ...this.props.ingredients };
      for (let key in disableClick)
        disableClick[key] = disableClick[key] <= 0;

      burger = (
        <Fragment>
          <Burger ingredients={this.props.ingredients} />
          <Controls
            ingredientAdded={this.props.ingredientAdded}
            ingredientRemoved={this.props.ingredientRemoved}
            disabled={disableClick}
            price={this.props.totalPrice}
            purchasable={this.props.totalPrice > 3}
            ordered={this.toggleSummaryHandler} />
        </Fragment>);

      orderSummary = <OrderSummary
        ingredients={this.props.ingredients}
        price={this.props.totalPrice}
        continueCommand={this.continueCommandHandler}
        cancelCommand={this.cancelCommandHandler} />
    }

    return (
      <Fragment>
        <Modal show={this.state.commandOrdered} modalClosed={this.cancelCommandHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice,
    error: state.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    ingredientAdded: (iName) => dispatch(actionCreators.addIngredient(iName)),
    ingredientRemoved: (iName) => dispatch(actionCreators.removeIngredient(iName)),
    initIngredients: () => dispatch(actionCreators.initIngredients()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(errorHandler(BurgerBuilder, axios));
