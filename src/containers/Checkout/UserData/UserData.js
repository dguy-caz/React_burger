import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import cssClasses from './UserData.css';
import axios from '../../../axiosOrders';
import Input from '../../../components/UI/Input/Input';

class UserData extends Component {
  state = {
    loading: false,
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: ''
      },
      mail: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your mail'
        },
        value: ''
      },
      phone: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your phone number'
        },
        value: ''
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your street'
        },
        value: ''
      },
      postalCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your postal code'
        },
        value: ''
      },
      city: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your city'
        },
        value: ''
      }
    }
  }

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const formData = {};
    for (let formElement in this.state.orderForm) {
      formData[formElement] = this.state.orderForm[formElement].value
    }

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      userData: formData
    }


    axios.post('/orders.json', order)
      .then(response => {
        this.setState({
          loading: false
        })
        this.props.history.push('/');
      })
      .catch(error => {
        this.setState({
          loading: false
        })
      });
  }

  inputchangedHandler = (event, inputId) => {
    const orderFormUpdated = {...this.state.orderForm};
    const orderFormElementUpdated = {...orderFormUpdated[inputId]};
    orderFormElementUpdated.value = event.target.value;
    orderFormUpdated[inputId] = orderFormElementUpdated;
    this.setState({orderForm: orderFormUpdated});
  }

  render() {
    const orderFormArray = [];
    for (let key in this.state.orderForm) {
      orderFormArray.push({
        id: key,
        setup: this.state.orderForm[key]
      });
    }

    const inputListArray = orderFormArray.map(formElement => (
      <Input
        key={formElement.id}
        elementType={formElement.setup.elementType}
        elementConfig={formElement.setup.elementConfig}
        value={formElement.setup.value}
        changed={(event) => this.inputchangedHandler(event, formElement.id)} />
    ));

    return (
      <div className={cssClasses.UserData}>
        <h4>Entry your user data</h4>
        <form onSubmit={this.orderHandler}> 
          {inputListArray}
          <Button buttonType="Success">ORDER</Button>
        </form>
      </div>
    );
  }
}

export default UserData;