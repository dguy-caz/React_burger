import React, { Component, Fragment } from 'react';
import axios from '../../axiosOrders';
import Burger from '../../components/Burger/Burger';
import Controls from '../../components/Burger/Controls/Controls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import errorHandler from '../../hoc/ErrorHandler/ErrorHandler';


const INGREDIENTS_PRICE = {
  salad: 0.3,
  bacon: 1,
  cheese: 0.7,
  meat: 1.5
};

class BurgerBuilder extends Component {

  state = {
    ingredients: null,
    totalPrice: 3,
    commandOrdered: false,
    loading: false,
    error: false
  }

  componentDidMount() {
    axios.request('https://burger-react-project-9a7f3.firebaseio.com/ingredients.json')
      .then(response => {
        this.setState({ ingredients: response.data });
      })
      .catch(error => {
        this.setState({ error: true })
      })
  }

  addIngredientHandler = (type) => {
    const newIngredients = { ...this.state.ingredients };
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
    const newIngredients = { ...this.state.ingredients };
    newIngredients[type] = this.state.ingredients[type] - 1;

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
    //   // alert('You continue!');
    //   const order = {
    //     ingredients: this.state.ingredients,
    //     price: this.state.totalPrice,
    //     customer: {
    //       name: 'David',
    //       address: {
    //         street: '15 rue Moquet',
    //         codePostal: '75013',
    //         city: 'Paris'
    //       },
    //       phone: '07.87.53.47.28',
    //       mail: 'david@test.fr'
    //     }
    //   }

    //   this.setState({loading: true});

    //   axios.post('/orders.json', order)
    //     .then(response => {
    //       this.setState({
    //         loading: false,
    //         commandOrdered: false
    //       })
    //     })
    //     .catch(error => {
    //       this.setState({
    //         loading: false,
    //         commandOrdered: false
    //       })
    //     });
      this.props.history.push({
        pathname: '/checkout',
        state: this.state
      });
  }


  render() {

    let burger = this.state.error ? <p style={{ textAlign: 'center' }}>The ingredients can't be loaded...</p> : <Spinner />;
    let orderSummary = null;

    if (this.state.ingredients) {
      const disableClick = { ...this.state.ingredients };
      for (let key in disableClick)
        disableClick[key] = disableClick[key] <= 0;

      burger = (
        <Fragment>
          <Burger ingredients={this.state.ingredients} />
          <Controls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disableClick}
            price={this.state.totalPrice}
            purchasable={this.state.totalPrice > 3}
            ordered={this.toggleSummaryHandler} />
        </Fragment>);

      orderSummary = <OrderSummary
        ingredients={this.state.ingredients}
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

export default errorHandler(BurgerBuilder, axios);
