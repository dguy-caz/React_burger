import * as actionTypes from './actionTypes';
import axios from '../../axiosOrders';

export const addIngredient = name => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name
  };
};

export const removeIngredient = name => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name
  };
};

export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: {
      salad: ingredients.salad,
      bacon: ingredients.bacon,
      cheese: ingredients.cheese,
      meat: ingredients.meat
    }
  };
};

export const ingredientsLoadingError = (ingredients) => {
  return {
    type: actionTypes.INGREDIENTS_LOADING_ERROR
  };
};


export const initIngredients = () => {
  return dispatch => {
    axios.request('https://burger-react-project-9a7f3.firebaseio.com/ingredients.json')
      .then(response => {
        dispatch(setIngredients(response.data));
      })
      .catch(error => {
        dispatch(ingredientsLoadingError());
      })
  };
};
