import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger'
import Controls from '../../components/Burger/Controls/Controls'

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
    totalPrice: 3
  }

  addIngredientHandler = (type) => {
    const newIngredients = {...this.state.ingredients};
    newIngredients[type] = this.state.ingredients[type] + 1;

    const newPrice = INGREDIENTS_PRICE[type] + this.state.totalPrice;

    this.setState({
      totalPrice: newPrice,
      ingredients: newIngredients
    });
    console.log(newIngredients);
  }
  
  render () {
    return (
      <Fragment>
        <Burger ingredients={this.state.ingredients} />
        <Controls ingredientAdded={this.addIngredientHandler}/>
      </Fragment>
    );
  }
}

export default BurgerBuilder;
