/* eslint-disable no-undef */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Row, Col } from 'react-bootstrap';
import { loadInsights } from './actions';
import { FormattedNumber, FormattedMessage } from 'react-intl';
import Repo from '../components/repo';
import PercentChange from "../components/percentChange";
import moment from 'moment';
import DateRangePicker from 'react-bootstrap-daterangepicker';


//TODO: Add pipes to format numbers
class InsightsPage extends Component {
  static propTypes = {
    mode: PropTypes.string.isRequired,
    insights: PropTypes.object,
    loadInsights: PropTypes.func.isRequired
  };

  componentWillMount() {
    this.props.loadInsights(this.props.mode);
    this.setState({
      ranges: {
        'Today': [moment(), moment()],
            'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            'Last 7 Days': [moment().subtract(6, 'days'), moment()],
            'Last 30 Days': [moment().subtract(29, 'days'), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
            'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
      },
      startDate: moment().subtract(29, 'days'),
      endDate: moment()
    });
  }

  handleEvent = (event, picker) => {
    this.setState({
      startDate: picker.startDate,
      endDate: picker.endDate
    });
  };

  renderRepo = ([ repo, owner ]) => {
    return (
      <Repo
        repo={repo}
        owner={owner}
        key={repo.fullName} />
    );
  };

  render() {
    let { insights, mode } = this.props;
    const period_length = 1;
    if (!insights) {
      return <h1><i>Loading Insights</i></h1>;
    }
    insights = Object.keys(this.props.insights).map(id => this.props.insights[id]);
    return (
        <div>
          <section className="content-header" >
            <FormattedMessage
                id="insights.myCustomersHeader"
                defaultMessage={`{title}`}
                values={{title: <h3> {mode == 'top' ? 'Top Customers' : 'My Customers'} </h3>}}>
              {(text) => (
                <h3>{text}</h3>
              )}
            </FormattedMessage>
          </section>
          <section className="content" >
            <div className={'box box-default'}>
              <div className={'box-header with-border'}>
                <Col sm={3} className={'formGroup'}>
                  <label><FormattedMessage
                      id="insights.daterangeLabel"
                      defaultMessage="Date range"
                  /></label>
                  <DateRangePicker startDate={this.state.startDate} endDate={this.state.endDate} ranges={this.state.ranges} onEvent={this.handleEvent}>
                    <Button className="selected-date-range-btn" style={{width:'100%'}}>
                      <div className="pull-left"><i className={'fa fa-calendar'}></i></div>
                      <FormattedMessage
                          id="insights.datesRangeLable"
                          defaultMessage={`{startDate} - {endDate}`}
                          values={{startDate: this.state.startDate.format("MMM Do YY"), endDate: this.state.endDate.format("MMM Do YY")}}
                      />
                      <div className="pull-right">
                        <span className="caret"></span>
                      </div>
                    </Button>
                  </DateRangePicker>
                </Col>
              </div>
            </div>
            <Row className='table-responsive'>
              <Col sm={12}>
                <table className='table table-striped'>
                  <thead>
                  <tr>
                    <th>Org ID <span data-toggle='tooltip' title='Organization ID in accounts system.' className='glyphicon glyphicon-question-sign'></span></th>
                    <th><FormattedMessage
                        id="insights.orgName"
                        defaultMessage="Organization Name"
                    /></th>
                    <th><FormattedMessage
                        id="insights.lookups"
                        defaultMessage="Lookups"
                    /><span data-toggle='tooltip' title='Total API queries in time period.' className='glyphicon glyphicon-question-sign'></span></th>
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
                        <td><FormattedNumber value={ insight.total } maximumFractionDigit={0}/></td>
                        <td><FormattedNumber value={ insight.revenue } currency={'USD'} style={'currency'}/></td>
                        {/*{% if period_length == 1 %}*/}
                        <td><FormattedNumber value={ insight.revenue7Day } currency={'USD'} style={'currency'}/></td>
                        {/*{% endif %}*/}
                        {/*{% if period_length == 1 %}*/}
                        <td>
                          <PercentChange orig={insight.yesterdayUsage} curr={insight.total}/>
                          <FormattedNumber value={Math.round(insight.yesterdayUsage)}/>
                        </td>
                        {/*{% endif %}*/}
                        <td>
                          <PercentChange orig={insight.before7} curr={insight.total}/>
                          <FormattedNumber value={Math.round(insight.before7)}/>
                        </td>
                        {/*{% if period_length == 1 %}*/}
                        <td>
                          <PercentChange orig={insight.average7} curr={insight.total}/>
                          <FormattedNumber value={Math.round(insight.average7)}/>
                        </td>
                        <td>
                          <PercentChange orig={insight.average30} curr={insight.total}/>
                          <FormattedNumber value={Math.round(insight.average30)}/>
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
              </Col>
            </Row>
          </section>
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
