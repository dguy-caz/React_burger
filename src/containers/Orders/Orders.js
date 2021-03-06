import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axiosOrders';
import ErrorHandler from '../../hoc/ErrorHandler/ErrorHandler';
import * as actionCreators from '../../Store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
  componentDidMount() {
    this.props.getOrders(this.props.token, this.props.userId);
  }

  render() {
    let orders = <Spinner />;
    if (!this.props.loading) {
      orders = this.props.orders.map(order => (
        <Order
          key={order.id + Math.random()}
          ingredients={order.ingredients}
          price={+order.price} />
      ))
    }
    return (
      <div>
        {orders}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.authentication.token,
    userId: state.authentication.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getOrders: (token, userId) => dispatch(actionCreators.getOrders(token, userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(Orders, axios));