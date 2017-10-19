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


//TODO: Add pipes to format numbers
class InsightsPage extends Component {
  static propTypes = {
    mode: PropTypes.string.isRequired,
    insights: PropTypes.object,
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
    let { insights } = this.props;
    const period_length = 1;
    if (!insights) {
      return <h1><i>Loading Insights</i></h1>;
    }
    insights = Object.keys(this.props.insights).map(id => this.props.insights[id]);
    return (
    <div className='table-responsive'>
      <table className='table table-striped'>
        <thead>
        <tr>
          <th>Org ID <span data-toggle='tooltip' title='Organization ID in accounts system.' className='glyphicon glyphicon-question-sign'></span></th>
          <th>Organization Name</th>
          <th>Lookups <span data-toggle='tooltip' title='Total API queries in time period.' className='glyphicon glyphicon-question-sign'></span></th>
          <th>Gross Revenue <span data-toggle='tooltip' title='Gross revenue from customer, before discounts.' className='glyphicon glyphicon-question-sign'></span></th>
          {/*{% if period_length == 1 %}*/}
          <th>7 Day Gross Revenue <span data-toggle='tooltip' title='Gross revenue from customer, in the period itself + 7 previous days.' className='glyphicon glyphicon-question-sign'></span></th>
          <th>Usage Yesterday <span data-toggle='tooltip' title='Usage 1 day before period start day.' className='glyphicon glyphicon-question-sign'></span></th>
          {/*{% endif %}*/}
          <th>Usage 7 days ago <span data-toggle='tooltip' title='Usage of same-length time period, starting 7 days before current. Used mainly for week comparisons.' className='glyphicon glyphicon-question-sign'></span></th>
          {/*{% if period_length == 1 %}*/}
          <th>Previous 7 days average <span data-toggle='tooltip' title='Average daily lookups in the last 7 days (not includning start day).' className='glyphicon glyphicon-question-sign'></span></th>
          <th>Last 30 day average <span data-toggle='tooltip' title='Average daily lookups in the last 30 days (not includning start day).' className='glyphicon glyphicon-question-sign'></span></th>
          {/*{% endif %}*/}
          <th>By Subscription <span data-toggle='tooltip' title='Breakdown of API calls by the Subscription.' className='glyphicon glyphicon-question-sign'></span></th>
          <th>By Status code <span data-toggle='tooltip' title='Breakdown of API calls by HTTP return status code (200 is OK).' className='glyphicon glyphicon-question-sign'></span></th>
        </tr>
        </thead>

        <tbody>
          {insights.map((insight, idx) => (
            <tr key={idx}>
              <td>{ insight.id }</td>
              <td>
                <a data-toggle='tooltip' title='Show organization overview' href={`/pipl_bi/organization/API/${insight.id}`}>{ insight.name }</a>
                {/*<a data-toggle='tooltip' title='Show usage graphs' target='_blank' href={`/pipl_bi/proxy/dashboard/db/api-bi/?var-OrganizationID=${insight.id}&from={{ grafana_from }}&to={{ grafana_to }}`}>
                  <img alt='Show graphs' src='{{ root_domain }}{% static 'img/graph.png' %}' />
                </a>*/}
                <a data-toggle='tooltip' title='Analyze queries' href={`/pipl_bi/debugger/${insight.id}`}>
                  <img alt='Show Queries' src={'/pipl_bi/assets/img/mag.gif'} />
                </a>
              </td>
              <td>{ insight.total }</td>
              <td>{ insight.revenue }</td>
              {/*{% if period_length == 1 %}*/}
              <td>{ insight.revenue7Day }</td>
              {/*{% endif %}*/}
              {/*{% if period_length == 1 %}*/}
              <td>
                {/*{% percentage_span org_data.total org_data.yesterday_usage %}*/}
                {/*&nbsp;{{ org_data.yesterday_usage|intcomma }}*/}
              </td>
              {/*{% endif %}*/}
              <td>
                {/*{% percentage_span org_data.total org_data.before_7 %}*/}
                {/*&nbsp;{{ org_data.before_7|intcomma }}*/}
              </td>
              {/*{% if period_length == 1 %}*/}
              <td>
                {/*{% percentage_span org_data.total org_data.average_7 %}*/}
                {/*&nbsp;{{ org_data.average_7|floatformat:0|intcomma }}*/}
              </td>
              <td>
                {/*{% percentage_span org_data.total org_data.average_30 %}*/}
                {/*&nbsp;{{ org_data.average_30|floatformat:0|intcomma }}*/}
              </td>
              {/*{% endif %}*/}
              <td>
                {/*{insight.count_by_subscription.items.map(({api_version, data_by_subscription}, idx) => (*/}
                  {/*{data_by_subscription.items.map(({subscription, value}, idx) => (*/}
                    {/*<span>*/}
                        {/*<a data-toggle='tooltip' title='Show usage graphs for {{ subscription }}' target='_blank' href='{{ link_prefix }}{% url 'proxy' 'dashboard/db/api-bi/' %}?var-OrganizationID={{ org }}&from={{ grafana_from }}&to={{ grafana_to }}&var-DeveloperclassName={{ subscription }}'><strong>{{ subscription }}</strong>: {{ value|intcomma }}</a>*/}
                        {/*<a data-toggle='tooltip' title='Analyze {{ subscription }} queries' href='{{ link_prefix }}{% url 'debugger_specific' org 'API_V'|add:api_version subscription %}'>*/}
                            {/*<img alt='Show Queries' src='{{ root_domain }}{% static 'img/mag.gif' %}' />*/}
                        {/*</a>*/}
                    {/*</span><br/>*/}
                  {/*))}*/}
                {/*))}*/}
              </td>
              <td>
                {/*{% for item, value in org_data.count_by_status.items %}*/}
                {/*<span><strong>{{ item }}</strong>: {{ value|intcomma }}</span><br />*/}
                {/*{% endfor %}*/}
              </td>
            </tr>))}
        </tbody>
      </table>
    </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const {
    entities: { insights }
  } = state;
  return {
    mode: ownProps.match.params.mode.toLowerCase(),
    insights
  };
};

export default withRouter(connect(mapStateToProps, {
  loadInsights
})(InsightsPage));
