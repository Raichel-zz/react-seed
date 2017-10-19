/* eslint-disable no-undef */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loadInsights } from './actions';
import User from '../components/user';
import Repo from '../components/repo';
import List from '../components/list';
import zip from 'lodash/zip';

class InsightsPage extends Component {
  static propTypes = {
    mode: PropTypes.string.isRequired,
    insights: PropTypes.array,
    loadInsights: PropTypes.func.isRequired
  };

  componentWillMount() {
    this.props.loadInsights(this.props.mode);
  }

  renderRepo = ([ repo, owner ]) => {
    return (
      <Repo
        repo={repo}
        owner={owner}
        key={repo.fullName} />
    );
  };

  render() {
    const { insights } = this.props;
    if (!insights) {
      return <h1><i>Loading Insights</i></h1>;
    } else {
      return <h1><i>{insights.toString()}</i></h1>;
    }
    //
    // const { starredRepos, starredRepoOwners, starredPagination } = this.props;
    // return (
    //   <div>
    //     <User user={user} />
    //     <hr />
    //     <List renderItem={this.renderRepo}
    //       items={zip(starredRepos, starredRepoOwners)}
    //       onLoadMoreClick={this.handleLoadMoreClick}
    //       loadingLabel={`Loading ${login}'s starred...`}
    //       {...starredPagination} />
    //   </div>
    // );
  }
}

const mapStateToProps = (state, ownProps) => {
  // We need to lower case the login due to the way GitHub's API behaves.
  // Have a look at ../middleware/api.js for more details.
  debugger;
  const mode = ownProps.match.params.mode.toLowerCase();
  const { insights } = state;
  return {
    mode,
    insights
  };
};

export default withRouter(connect(mapStateToProps, {
  loadInsights
})(InsightsPage));
