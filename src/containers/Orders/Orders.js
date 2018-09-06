import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axiosOrders';
import ErrorHandler from '../../hoc/ErrorHandler/ErrorHandler';

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  }

  componentDidMount() {
    axios.get('/orders.json')
      .then(response => {
        const ordersArray = [];
        for (let key in response.data) {
          ordersArray.push({
            ...response.data[key],
            id: key
          });
        }
        this.setState({ orders: ordersArray, loading: false });
      })
      .catch(error => {
        this.setState({ loading: false });
      })
  }

  render() {
    return (
      <div>
        {this.state.orders.map(order => (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={+order.price} />
        ))}
      </div>
    );
  }
}

export default ErrorHandler(Orders, axios);