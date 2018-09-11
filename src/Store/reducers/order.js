import * as actionTypes from '../actions/actionTypes';

const firstState = {
  orders: [],
  purchased: false,
  loading: false
};

const reducer = (state = firstState, action) => {
  if (action.type === actionTypes.ACCEPT_ORDER) {
    const newOrder = {
      ...action.orderData,
      id: action.orderId
    };
    return {
      ...state,
      orders: state.orders.concat(newOrder),
      loading: false,
      purchased: true
    };
  }
  else if (action.type === actionTypes.CANCEL_ORDER) {
    return {
      ...state,
    };
  }
  else if (action.type === actionTypes.PURCHASING_ORDER) {
    return {
      ...state,
      loading: true
    };
  }
  else if (action.type === actionTypes.PURCHASE_INIT) {
    return {
      ...state,
      purchased: false
    };
  }
  else if (action.type === actionTypes.ORDERS_INIT) {
    return {
      ...state,
      loading: true
    };
  }
  else if (action.type === actionTypes.ORDERS_DONE) {
    return {
      ...state,
      orders: action.orders,
      loading: false
    };
  }
  else if (action.type === actionTypes.ORDERS_FAIL) {
    return {
      ...state,
      loading: false
    };
  }
  else
    return state;
}

export default reducer;
