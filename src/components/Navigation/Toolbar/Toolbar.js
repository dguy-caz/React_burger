import React from 'react';
import cssClasses from './Toolbar.css';
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'

const toolbar = (props) => (
  <header className={cssClasses.Toolbar}>
    <DrawerToggle clicked={props.menuClicked} />
    <div className={cssClasses.Logo}>
      <Logo />
    </div>
    <nav className={cssClasses.DesktopOnly}>
      <NavigationItems isAuth={props.isAuth} />
    </nav>
  </header>
);

export default toolbar;
