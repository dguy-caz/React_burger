import React, { Component, Fragment } from 'react';
import cssClasses from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
import { connect } from 'react-redux';

class Layout extends Component {
  state = {
    showSideDrawer: false
  }
  closeSideDrawerHandler = () => {
    this.setState({ showSideDrawer: false });
  }

  openSideDrawerHandler = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  }

  render() {
    return (
      <Fragment>
        <Toolbar
          isAuth={this.props.isAuthenticated}
          menuClicked={this.openSideDrawerHandler} />
        <SideDrawer
          isAuth={this.props.isAuthenticated}
          opened={this.state.showSideDrawer}
          closed={this.closeSideDrawerHandler} />
        <main className={cssClasses.Content}>
          {this.props.children}
        </main>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.authentication.token != null
  }
}

export default connect(mapStateToProps)(Layout);