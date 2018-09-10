import * as actionTypes from './actions';

const firstState = {
  ingredients: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0
  },
  totalPrice: 3
}

const reducer = (state = firstState, action) => {
  if (action.type === actionTypes.ADD_INGREDIENT) {
    return {
      ...state,
      ingredients: {
        ...state.ingredients,
        [action.ingredientName]: state.ingredients[action.ingredientName] + 1
      }
    }
  }
  else if (action.type === actionTypes.REMOVE_INGREDIENT) {
    return {
      ...state,
      ingredients: {
        ...state.ingredients,
        [action.ingredientName]: state.ingredients[action.ingredientName] - 1
      }
    }
  }
  else
    return state;
}

export default reducer;
