/* eslint-disable no-undef */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Explore from './components/explore';
import { resetErrorMessage } from '../actions/index';
import { Button } from 'react-bootstrap';
import Header from './components/header';

class App extends Component {
  static propTypes = {
    // Injected by React Redux
    errorMessage: PropTypes.string,
    resetErrorMessage: PropTypes.func.isRequired,
    inputValue: PropTypes.string.isRequired,
    // Injected by React Router
    children: PropTypes.node
  };

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
    const { children, inputValue } = this.props;
    return (
      <div className={"wrapper"}>
        <Header />
        <div className="sidebar-wrapper"></div>
        <div className="content-wrapper">
          <Explore value={inputValue} onChange={this.handleChange} />
          <hr />
          {this.renderErrorMessage()}
          {children}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  errorMessage: state.errorMessage,
  inputValue: ownProps.location.pathname.substring(1)
});

export default withRouter(connect(mapStateToProps, {
  resetErrorMessage
})(App));
