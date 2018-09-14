import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import cssClasses from './Auth.css';
import * as actionCreators from '../../Store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import { checkValidity } from '../../Shared/utility';

class Auth extends Component {
  state = {
    isSignUp: false,
    authForm: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email Address'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true,
          valid: false
        }
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6,
          valid: false
        }
      },
    }
  }

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return {
        isSignUp: !prevState.isSignUp
      }
    })
  }

  inputchangedHandler = (event, inputId) => {
    const authFormUpdated = {
      ...this.state.authForm,
      [inputId]: {
        ...this.state.authForm[inputId],
        value: event.target.value,
        validation: {
          ...this.state.authForm[inputId].validation,
          valid: checkValidity(event.target.value, this.state.authForm[inputId].validation),
          touched: true
        }
      }
    };
    this.setState({ authForm: authFormUpdated });
  }

  submitHandler = event => {
    event.preventDefault();
    this.props.authentication(this.state.authForm.email.value, this.state.authForm.password.value, this.state.isSignUp);
  }

  render() {
    const authFormArray = [];
    for (let key in this.state.authForm) {
      authFormArray.push({
        id: key,
        setup: this.state.authForm[key]
      });
    }

    let form = authFormArray.map(formElement => (
      <Input
        key={formElement.id}
        invalid={!formElement.setup.validation.valid}
        elementType={formElement.setup.elementType}
        elementConfig={formElement.setup.elementConfig}
        value={formElement.setup.value}
        changed={(event) => this.inputchangedHandler(event, formElement.id)} />
    ))
    if (this.props.loading)
      form = <Spinner />;

    let errorMessage = null;
    if (this.props.error)
      errorMessage = <p style={{ textAlign: 'center' }}>{this.props.error.message}</p>

    let redirection = null;
    if (this.props.isAuth) {
      if (this.props.isBuilding)
        redirection = <Redirect to='/checkout' />;
      else
        redirection = <Redirect to='/' />;
    }

    return (
      <div className={cssClasses.Auth} >
        {redirection}
        {errorMessage}
        <form onSubmit={this.submitHandler} >
          {form}
          < Button buttonType="Success" > SUBMIT</Button>
        </form >
        <Button
          click={this.switchAuthModeHandler}
          buttonType="Danger">Switch to {this.state.isSignUp ? 'SIGN IN' : 'SIGN UP'}</Button>
      </div >
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.authentication.loading,
    error: state.authentication.error,
    isAuth: state.authentication.token !== null,
    isBuilding: state.burgerBuilder.building
  }
}

const mapDispatchToProps = dispatch => {
  return {
    authentication: (email, password, isSignUp) => dispatch(actionCreators.authentication(email, password, isSignUp))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
