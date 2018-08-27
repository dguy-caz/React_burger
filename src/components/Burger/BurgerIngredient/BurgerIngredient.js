import React, { Fragment } from 'react'
import cssClasses from './BurgerIngredient.css'

const BurgerIngredient = (props) => {
  let ingredient = null;

  if (props.type === 'bread-bottom')
    ingredient = <div className={cssClasses.BreadBottom}></div>;
  else if (props.type === 'bread-top') {
    ingredient = (
      <div className={cssClasses.BreadTop}>
        <div className={cssClasses.seeds1}></div>
        <div className={cssClasses.seeds2}></div>
      </div>
    );
  }
  else if (props.type === 'meat')
    ingredient = <div className={cssClasses.Meat}></div>;
  else if (props.type === 'cheese')
    ingredient = <div className={cssClasses.Cheese}></div>;
  else if (props.type === 'salad')
    ingredient = <div className={cssClasses.Salad}></div>;
  else if (props.type === 'bacon')
    ingredient = <div className={cssClasses.Bacon}></div>;

  return ingredient;
}

export default BurgerIngredient;
