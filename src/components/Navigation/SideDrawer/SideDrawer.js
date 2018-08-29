import React, { Fragment } from 'react';
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import cssClasses from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop'

const sideDrawer = (props) => {
  let attachedClasses = [cssClasses.SideDrawer, cssClasses.Close];

  if (props.opened) {
    attachedClasses = [cssClasses.SideDrawer, cssClasses.Open];
  }

  return (
    <Fragment>
      <Backdrop show={props.opened} clickedBackdrop={props.closed}/>
      <div className={attachedClasses.join(' ')}>
        <div className={cssClasses.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Fragment>
  )
};

export default sideDrawer;