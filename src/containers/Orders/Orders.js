import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axiosOrders';
import ErrorHandler from '../../hoc/ErrorHandler/ErrorHandler';
import * as actionCreators from '../../Store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
  componentDidMount() {
    this.props.getOrders();
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
    console.log(orders);
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
    loading: state.order.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getOrders: () => dispatch(actionCreators.getOrders())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(Orders, axios));