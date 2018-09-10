import React, { Component, Fragment } from 'react';
import axios from '../../axiosOrders';
import Burger from '../../components/Burger/Burger';
import Controls from '../../components/Burger/Controls/Controls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import errorHandler from '../../hoc/ErrorHandler/ErrorHandler';
import { connect } from 'react-redux';
import * as actionTypes from '../../Store/actions';


const INGREDIENTS_PRICE = {
  salad: 0.3,
  bacon: 1,
  cheese: 0.7,
  meat: 1.5
};

class BurgerBuilder extends Component {

  state = {
    totalPrice: 3,
    commandOrdered: false,
    loading: false,
    error: false
  }

  componentDidMount() {
    // axios.request('https://burger-react-project-9a7f3.firebaseio.com/ingredients.json')
    //   .then(response => {
    //     this.setState({ ingredients: response.data });
    //   })
    //   .catch(error => {
    //     this.setState({ error: true })
    //   })
  }

  addIngredientHandler = (type) => {
    const newIngredients = { ...this.props.ingredients };
    newIngredients[type] = this.props.ingredients[type] + 1;

    const newPrice = INGREDIENTS_PRICE[type] + this.state.totalPrice;

    this.setState({
      totalPrice: newPrice,
      ingredients: newIngredients,
    });
  }

  removeIngredientHandler = (type) => {
    if (this.props.ingredients[type] <= 0)
      return;
    const newIngredients = { ...this.props.ingredients };
    newIngredients[type] = this.props.ingredients[type] - 1;

    const newPrice = this.state.totalPrice - INGREDIENTS_PRICE[type];

    this.setState({
      totalPrice: newPrice,
      ingredients: newIngredients,
    });
  }

  toggleSummaryHandler = () => {
    this.setState({ commandOrdered: true });
  }

  cancelCommandHandler = () => {
    this.setState({ commandOrdered: false });
  }

  continueCommandHandler = () => {
    this.props.history.push({
      pathname: '/checkout',
      state: this.state
    });
  }


  render() {

    let burger = this.state.error ? <p style={{ textAlign: 'center' }}>The ingredients can't be loaded...</p> : <Spinner />;
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
            price={this.state.totalPrice}
            purchasable={this.state.totalPrice > 3}
            ordered={this.toggleSummaryHandler} />
        </Fragment>);

      orderSummary = <OrderSummary
        ingredients={this.props.ingredients}
        price={this.state.totalPrice}
        continueCommand={this.continueCommandHandler}
        cancelCommand={this.cancelCommandHandler} />
    }
    if (this.state.loading)
      orderSummary = <Spinner />

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
    ingredients: state.ingredients
  }
}

const mapDispatchToProps = dispatch => {
  return {
    ingredientAdded: (iName) => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: iName }),
    ingredientRemoved: (iName) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: iName })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(errorHandler(BurgerBuilder, axios));
