import * as actionTypes from '../actions/actionTypes';

const firstState = {
  ingredients: null,
  totalPrice: 3,
  error: false
};

const INGREDIENTS_PRICE = {
  salad: 0.3,
  bacon: 1,
  cheese: 0.7,
  meat: 1.5
};

const reducer = (state = firstState, action) => {
  if (action.type === actionTypes.ADD_INGREDIENT) {
    return {
      ...state,
      ingredients: {
        ...state.ingredients,
        [action.ingredientName]: state.ingredients[action.ingredientName] + 1
      },
      totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.ingredientName]
    };
  }
  else if (action.type === actionTypes.REMOVE_INGREDIENT) {
    return {
      ...state,
      ingredients: {
        ...state.ingredients,
        [action.ingredientName]: state.ingredients[action.ingredientName] - 1
      },
      totalPrice: state.totalPrice - INGREDIENTS_PRICE[action.ingredientName]
    };
  }
  else if (action.type === actionTypes.SET_INGREDIENTS) {
    return {
      ...state,
      ingredients: action.ingredients,
      error: false
    };
  }
  else if (action.type === actionTypes.INGREDIENTS_LOADING_ERROR) {
    return {
      ...state,
      error: true
    };
  }
  else
    return state;
}

export default reducer;
