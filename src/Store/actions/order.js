import * as actionTypes from './actionTypes';
import axios from '../../axiosOrders';

export const acceptOrder = (id, orderData) => {
  return {
    type: actionTypes.ACCEPT_ORDER,
    orderID: id,
    orderData: orderData
  };
};

export const cancelOrder = (error) => {
  return {
    type: actionTypes.CANCEL_ORDER,
    error: error
  };
};

export const purchasingOrder = () => {
  return {
    type: actionTypes.PURCHASING_ORDER
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  };
};

export const orderAccepted = (orderData, token) => {
  return dispatch => {
    dispatch(purchasingOrder());
    axios.post('/orders.json?auth=' + token, orderData)
      .then(response => {
        dispatch(acceptOrder(response.data.name, orderData));
      })
      .catch(error => {
        dispatch(cancelOrder(error));
      });
  }
};

export const orderDone = (orders) => {
  return {
    type: actionTypes.ORDERS_DONE,
    orders: orders
  };
};

export const orderFail = (error) => {
  return {
    type: actionTypes.ORDERS_FAIL,
    error: error
  };
};

export const orderInit = () => {
  return {
    type: actionTypes.ORDERS_INIT,
  };
};

export const getOrders = (token, userId) => {
  return dispatch => {
    dispatch(orderInit());
    axios.get('/orders.json?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"')
      .then(response => {
        const ordersArray = [];
        for (let key in response.data) {
          ordersArray.push({
            ...response.data[key],
            id: key
          });
        }
        dispatch(orderDone(ordersArray));
      })
      .catch(error => {
        dispatch(orderFail(error));
      });
  }
};
