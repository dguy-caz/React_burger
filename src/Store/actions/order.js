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
}

export const orderAccepted = (orderData) => {
  return dispatch => {
    dispatch(purchasingOrder());
    axios.post('/orders.json', orderData)
      .then(response => {
        console.log(response.data.name);
        dispatch(acceptOrder(response.data.name, orderData));
      })
      .catch(error => {
        dispatch(cancelOrder(error));
      });
  }
};
