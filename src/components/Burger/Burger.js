import React from 'react';
import cssClasses from './Burger.css';
import Ingredient from './Ingredient/Ingredient';

const burger = (props) => {
  let ingredientArray = Object.keys(props.ingredients).map(ingredientKey => {
    return [...Array(props.ingredients[ingredientKey])].map((_, i) => {
      return <Ingredient key={ingredientKey + i} type={ingredientKey} />
    });
  }).reduce((total, currentArray) => total.concat(currentArray), []);

  if (ingredientArray.length === 0)
    ingredientArray = <p>Please add some ingredients</p>;

  return (
    <div className={props.changeStyle ? cssClasses.BurgerOrdered : cssClasses.Burger}>
      <Ingredient type="bread-top" />
      {ingredientArray}
      <Ingredient type="bread-bottom" />
    </div>
  )
};

export default burger;
