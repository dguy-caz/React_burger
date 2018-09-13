import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../../Store/actions/index';
import { Redirect } from 'react-router-dom';

class Logout extends Component {
  componentDidMount () {
    this.props.logOut();
  }

  render() {
    return <Redirect to="/" />;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logOut: () => dispatch(actionCreators.authLogOut())
  };
}

export default connect(null, mapDispatchToProps)(Logout);