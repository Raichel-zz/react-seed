/* eslint-disable no-undef */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { resetErrorMessage } from '../actions';
import { loadCurrentUser, logout } from './user/actions';
import { Button } from 'react-bootstrap';
import Header from './components/header';
import SideBar from './components/sidebar';
import InsightsPage from "./insights";

class App extends Component {
  static propTypes = {
    // Injected by React Redux
    currentUser: PropTypes.object,
    errorMessage: PropTypes.string,
    resetErrorMessage: PropTypes.func.isRequired,
    inputValue: PropTypes.string.isRequired,
    loadCurrentUser: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    // Injected by React Router
    children: PropTypes.node
  };

  componentWillMount() {
    this.props.loadCurrentUser();
  }

  componentDidUpdate() {
    $('.sidebar-menu').tree({});
  }

  handleDismissClick = e => {
    this.props.resetErrorMessage();
    e.preventDefault();
  };

  handleChange = nextValue => {
    this.props.history.push(`/${nextValue}`);
  };

  renderErrorMessage() {
    const { errorMessage } = this.props;
    if (!errorMessage) {
      return null;
    }

    return (
      <p style={{ backgroundColor: '#e99', padding: 10 }}>
        <b>{errorMessage}</b>
        {' '}
        <Button onClick={this.handleDismissClick}>
          Dismiss
        </Button>
      </p>
    );
  }

  render() {
    if(!this.props.currentUser) {
      return (<div/>);
    }
    const { children, inputValue } = this.props;
    const { firstName, lastName } = this.props.currentUser;
    return (
      <div>
        <Header username={`${firstName} ${lastName}`} logout={this.props.logout}/>
        <SideBar/>
        <div className="content-wrapper" style={{minHeight: '400px'}}>
          <section className="content-header" ></section>
          <section className="content" >
            {/*<Explore value={inputValue} onChange={this.handleChange} />*/}
            <Route path="/insights/:mode" component={InsightsPage} />
            <hr />
            {this.renderErrorMessage()}
            {children}
          </section>
        </div>
        <footer className="main-footer">
          <strong>Copyright © 2017 <a href="https://pipl.com">Pipl</a>.</strong> All rights reserved.
        </footer>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.currentUser,
  errorMessage: state.errorMessage,
  inputValue: ownProps.location.pathname.substring(1)
});

export default withRouter(connect(mapStateToProps, {
  loadCurrentUser,
  logout,
  resetErrorMessage
})(App));
