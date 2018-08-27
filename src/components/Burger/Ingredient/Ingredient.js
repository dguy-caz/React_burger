import React, { Component } from 'react';
import cssClasses from './Ingredient.css';
import PropTypes from 'prop-types';

class Ingredient extends Component {
  render() {
    let ingredient = null;

    if (this.props.type === 'bread-bottom')
      ingredient = <div className={cssClasses.BreadBottom}></div>;
    else if (this.props.type === 'bread-top') {
      ingredient = (
        <div className={cssClasses.BreadTop}>
          <div className={cssClasses.Seeds1}></div>
          <div className={cssClasses.Seeds2}></div>
        </div>
      );
    }
    else if (this.props.type === 'meat')
      ingredient = <div className={cssClasses.Meat}></div>;
    else if (this.props.type === 'cheese')
      ingredient = <div className={cssClasses.Cheese}></div>;
    else if (this.props.type === 'salad')
      ingredient = <div className={cssClasses.Salad}></div>;
    else if (this.props.type === 'bacon')
      ingredient = <div className={cssClasses.Bacon}></div>;

    return ingredient;
  }
}

Ingredient.proTypes = {
  type: PropTypes.string.isRequired
}

export default Ingredient;
