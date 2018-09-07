import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import cssClasses from './UserData.css';
import axios from '../../../axiosOrders';
import Input from '../../../components/UI/Input/Input';

class UserData extends Component {
  state = {
    loading: false,
    formIsValid: false,
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          valid: false
        }
      },
      mail: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your mail'
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          valid: false
        }
      },
      phone: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your phone number'
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          valid: false
        }
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your street'
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          valid: false
        }
      },
      postalCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your postal code'
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          valid: false
        }
      },
      city: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your city'
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          valid: false
        }
      }
    }
  }

  orderHandler = (event) => {
    event.preventDefault();
    const formData = {};
    for (let formElement in this.state.orderForm) {
      formData[formElement] = this.state.orderForm[formElement].value
    }

    this.setState({ loading: true });

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
    const orderFormUpdated = { ...this.state.orderForm };
    const orderFormElementUpdated = { ...orderFormUpdated[inputId] };
    orderFormElementUpdated.value = event.target.value;
    orderFormElementUpdated.validation.valid = this.checkValidity(orderFormElementUpdated.value, orderFormElementUpdated.validation);
    orderFormUpdated[inputId] = orderFormElementUpdated;
    
    let formIsValid = true;
    for (let element in orderFormUpdated) {
      formIsValid = orderFormUpdated[element].validation.valid && formIsValid;
    }
    this.setState({ orderForm: orderFormUpdated, formIsValid: formIsValid });
  }

  checkValidity(value, rules) {
    let isValid = true;

    if (rules.required && isValid) {
      isValid = value.trim() !== '';
    }
    if (rules.minLength && isValid) {
      isValid = value.length >= rules.minLength;
    }
    return isValid;
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
        invalid={!formElement.setup.validation.valid}
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
          <Button buttonType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
        </form>
      </div>
    );
  }
}

export default UserData;