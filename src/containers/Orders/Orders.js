import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axiosOrders';

class Orders extends Component {
  componentDidMount() {

  }

  render() {
    return (
      <div>
        <Order />
        <Order />
      </div>
    );
  }
}

export default Orders;