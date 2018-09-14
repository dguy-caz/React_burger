import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import cssClasses from './UserData.css';
import Input from '../../../components/UI/Input/Input';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import errorHandler from '../../../hoc/ErrorHandler/ErrorHandler';
import axios from '../../../axiosOrders';
import * as actionCreators from '../../../Store/actions/index';
import { checkValidity } from '../../../Shared/utility';

class UserData extends Component {
  state = {
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
          isEmail: true,
          valid: false
        }
      },
      phone: {
        elementType: 'input',
        elementConfig: {
          type: 'number',
          placeholder: 'Your phone number'
        },
        value: '',
        validation: {
          required: true,
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
          valid: false
        }
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'number',
          placeholder: 'Your zip code'
        },
        value: '',
        validation: {
          required: true,
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

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      userData: formData,
      userId: this.props.userId
    }

    this.props.orderAccepted(order, this.props.token);
  }

  inputchangedHandler = (event, inputId) => {
    const orderFormUpdated = { ...this.state.orderForm };
    const orderFormElementUpdated = { ...orderFormUpdated[inputId] };
    orderFormElementUpdated.value = event.target.value;
    orderFormElementUpdated.validation.valid = checkValidity(orderFormElementUpdated.value, orderFormElementUpdated.validation);
    orderFormUpdated[inputId] = orderFormElementUpdated;

    let formIsValid = true;
    for (let element in orderFormUpdated) {
      formIsValid = orderFormUpdated[element].validation.valid && formIsValid;
    }
    this.setState({ orderForm: orderFormUpdated, formIsValid: formIsValid });
  }

  render() {
    const orderFormArray = [];
    for (let key in this.state.orderForm) {
      orderFormArray.push({
        id: key,
        setup: this.state.orderForm[key]
      });
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {orderFormArray.map(formElement => (
          <Input
            key={formElement.id}
            invalid={!formElement.setup.validation.valid}
            elementType={formElement.setup.elementType}
            elementConfig={formElement.setup.elementConfig}
            value={formElement.setup.value}
            changed={(event) => this.inputchangedHandler(event, formElement.id)} />
        ))}
        <Button buttonType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
      </form>
    )
    if (this.props.loading) {
      form = <Spinner />;
    }
    return (
      <div className={cssClasses.UserData}>
        <h4>Entry your user datas</h4>
        {form}
      </div >
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.authentication.token,
    userId: state.authentication.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    orderAccepted: (orderData, token) => dispatch(actionCreators.orderAccepted(orderData, token))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(errorHandler(UserData, axios));