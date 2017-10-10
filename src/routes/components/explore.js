/* eslint-disable no-undef */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, FormControl, FormGroup, Col, Row, Panel } from 'react-bootstrap';

const GITHUB_REPO = 'https://github.com/reactjs/redux';

export default class Explore extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setInputValue(nextProps.value);
    }
  }

  getInputValue = () => {
    return this.input.value;
  };

  setInputValue = (val) => {
    // Generally mutating DOM is a bad idea in React components,
    // but doing this for a single uncontrolled field is less fuss
    // than making it controlled and maintaining a state for it.
    this.input.value = val;
  };

  handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      this.handleGoClick();
    }
  };

  handleGoClick = () => {
    this.props.onChange(this.getInputValue());
  };

  render() {
    return (
      <Panel header={"Type a username or repo full name and hit 'Go':"}>
        <Row>
          <FormGroup>
            <Col sm={3}>
              <FormControl
                ref={(input) => this.input = input}
                defaultValue={this.props.value}
                onKeyUp={this.handleKeyUp} >
              </FormControl>
            </Col>
            <Col sm={4}>
              <Button className={"btn-primary"} onClick={this.handleGoClick}>
                Go!
              </Button>
            </Col>
          </FormGroup>
        </Row>
        <Row>
          <Col sm={12}>
            <p>
              Code on <a href={GITHUB_REPO} target="_blank" rel="noopener noreferrer">Github</a>.
            </p>
            <p>
              Move the DevTools with Ctrl+W or hide them with Ctrl+H.
            </p>
          </Col>
        </Row>
      </Panel>
    );
  }
}
