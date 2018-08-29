import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';
import Controls from '../../components/Burger/Controls/Controls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENTS_PRICE = {
  salad: 0.3,
  bacon: 1,
  cheese: 0.7,
  meat: 1.5
};

class BurgerBuilder extends Component {
  
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 3,
    commandOrdered: false
  }

  addIngredientHandler = (type) => {
    const newIngredients = {...this.state.ingredients};
    newIngredients[type] = this.state.ingredients[type] + 1;

    const newPrice = INGREDIENTS_PRICE[type] + this.state.totalPrice;

    this.setState({
      totalPrice: newPrice,
      ingredients: newIngredients,
    });
  }
  
  removeIngredientHandler = (type) => {
    if (this.state.ingredients[type] <= 0)
      return;
    const newIngredients = {...this.state.ingredients};
    newIngredients[type] = this.state.ingredients[type] - 1;

    const newPrice = this.state.totalPrice - INGREDIENTS_PRICE[type];

    this.setState({
      totalPrice: newPrice,
      ingredients: newIngredients,
    });
  }

  toggleSummaryHandler = () => {
    this.setState({commandOrdered: true});
  }

  cancelCommandHandler = () => {
    this.setState({commandOrdered: false});
  }


  render () {
    const disableClick = {...this.state.ingredients};
    for (let key in disableClick)
      disableClick[key] = disableClick[key] <= 0;

    return (
      <Fragment>
        <Modal show={this.state.commandOrdered} modalClosed={this.cancelCommandHandler}>
          <OrderSummary ingredients={this.state.ingredients}/>
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <Controls 
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disableClick}
          price={this.state.totalPrice}
          purchasable={this.state.totalPrice > 3}
          ordered={this.toggleSummaryHandler} />
      </Fragment>
    );
  }
}

export default BurgerBuilder;
