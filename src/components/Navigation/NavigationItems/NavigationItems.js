import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import cssClasses from './NavigationItems.css';

const navigationItems = (props) => (
  <ul className={cssClasses.NavigationItems}>
    <NavigationItem link="/">Burger Builder</NavigationItem>
    {props.isAuth ? <NavigationItem link="/orders">Orders</NavigationItem> : null}
    {props.isAuth ?
      <NavigationItem link="/logout">Log out</NavigationItem> :
      <NavigationItem link="/Auth">Authentication</NavigationItem>}
  </ul>
);

export default navigationItems;
