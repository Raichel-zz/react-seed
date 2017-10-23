import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class PercentChange extends Component {
  static propTypes = {
    orig: PropTypes.number.isRequired,
    curr: PropTypes.number.isRequired
  };

  calculatePercentage = (orig, curr) => {
    if(orig === 0 && curr === 0) {
      return 0;
    }
    if(orig === 0 && curr > 0) {
      return 100;
    }
    return ((curr - orig) / orig) * 100;
  }


  render() {
    const percentage = this.calculatePercentage(this.props.orig, this.props.curr);
    let bg, arrow;
    if(percentage > 0) {
      bg = 'darkgreen';
      arrow = '▲';
    } else if(percentage < 0) {
      bg = 'darkred';
      arrow = '▼';
    } else {
      bg = '#666';
      arrow = '▼▲';
    }
    return (
        <span style={{color: 'white', backgroundColor: bg, marginRight: '5px'}}>{`${arrow} ${percentage}%`}</span>
    );
  }
}