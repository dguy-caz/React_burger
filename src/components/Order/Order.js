import React from 'react';
import cssClasses from './Order.css';

const order = (props) => {
  const ingredientsArray = [];

  for (let ingredient in props.ingredients) {
    ingredientsArray.push({
      name: ingredient,
      value: props.ingredients[ingredient]
    });
  }

  const ingredientOutput = ingredientsArray.map(ingredient => {
    return (
      <span style={{
        textTransform: 'capitalize',
        display: 'inline-block',
        border: '1px solid #ccc',
        margin: '0 8px',
        padding: '5px'
      }}>
        {ingredient.name} ({ingredient.value})
    </span>
    );
  });

  return (
    <div className={cssClasses.Order}>
      <p>Ingredients: {ingredientOutput}</p>
      <p>Price: <strong>{props.price.toFixed(2)} €</strong></p>
    </div>

  )
};

export default order;
