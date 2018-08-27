import React, { Fragment } from 'react';
import cssClasses from './Layout.css';

const layout = (props) => (
  <Fragment>
    <div>Toolbar, SideDrawer, Backdrop</div>
    <main className={cssClasses.Content}>
      {props.children}
    </main>
  </Fragment>
);

export default layout;