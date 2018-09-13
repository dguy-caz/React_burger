import React, { Component } from 'react';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import LogOut from './containers/Auth/Logout/Logout';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from './Store/actions/index';

class App extends Component {
  componentDidMount() {
    this.props.autoSignIn();
  }

  render() {
    let routes = (
      <Switch>
        <Route path='/auth' component={Auth} />
        <Route path='/' exact component={BurgerBuilder} />
        <Redirect to='/' />
      </Switch>
    );
    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route path='/checkout' component={Checkout} />
          <Route path='/orders' component={Orders} />
          <Route path='/logout' component={LogOut} />
          <Route path='/auth' component={Auth} />
          <Route path='/' exact component={BurgerBuilder} />
        </Switch>
      );
    }

    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.authentication.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    autoSignIn: () => dispatch(actionCreators.authCheckLocalStorage())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
