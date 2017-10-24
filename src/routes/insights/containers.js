/* eslint-disable no-undef */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Row, Col } from 'react-bootstrap';
import { loadInsights } from './actions';
import { FormattedNumber, FormattedMessage } from 'react-intl';
import PercentChange from '../components/percentChange';
import moment from 'moment';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import mag from 'assets/img/mag.gif';

class InsightsPage extends Component {
  static propTypes = {
    mode: PropTypes.string.isRequired,
    insights: PropTypes.object,
    loadInsights: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.state = {
      ranges: {
        'Today': [moment(), moment()],
            'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            'Last 7 Days': [moment().subtract(6, 'days'), moment()],
            'Last 30 Days': [moment().subtract(29, 'days'), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
            'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
      },
      period_length: 1,
      startDate: moment().subtract(1, 'days'),
      endDate: moment()
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.mode != nextProps.mode) {
      this.props.loadInsights(nextProps.mode, this.state.startDate, this.state.endDate);
    }
  }

  componentDidMount() {
    this.props.loadInsights(this.props.mode, this.state.startDate, this.state.endDate);
    $('[data-toggle="tooltip"]').tooltip();
  }

  onDateRangeChanged = (event, picker) => {
    this.setState({
      startDate: picker.startDate,
      endDate: picker.endDate,
      period_length: Math.abs(picker.startDate.diff(picker.endDate, 'days'))
    });
    this.props.loadInsights(this.props.mode, this.state.startDate, this.state.endDate);
  };

  render() {
    let { insights, mode } = this.props;
    const period_length = 1;
    insights = insights ? Object.values(this.props.insights) : [];
    return (
        <div>
          <section className={'content-header'}>
            <FormattedMessage
                id='insights.myCustomersHeader'
                defaultMessage={`{title}`}
                values={{title: <h3> {mode == 'top' ? 'Top Customers' : 'My Customers'} </h3>}}>
            </FormattedMessage>
          </section>
          <section className='content' >
            <div className={'box box-default'}>
              <div className={'box-header with-border'}>
                <Col sm={3} className={'formGroup'}>
                  <label><FormattedMessage
                      id='insights.daterangeLabel'
                      defaultMessage='Date range'
                  /></label>
                  <DateRangePicker startDate={this.state.startDate} endDate={this.state.endDate} ranges={this.state.ranges} onApply={this.onDateRangeChanged}>
                    <Button className='selected-date-range-btn' style={{width:'100%'}}>
                      <div className='pull-left'><i className={'fa fa-calendar'}></i></div>
                      <FormattedMessage
                          id='insights.datesRangeLable'
                          defaultMessage={`{startDate} - {endDate}`}
                          values={{startDate: this.state.startDate.format('MMM Do YY'), endDate: this.state.endDate.format('MMM Do YY')}}
                      />
                      <div className='pull-right'>
                        <span className='caret'></span>
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
                    <th>
                      <FormattedMessage id='insights.orgId' defaultMessage='Org ID'/>
                      <FormattedMessage id='insights.orgIdTooltip' defaultMessage='Organization ID in accounts system.'>
                        {(text) => (<span data-toggle='tooltip' title={text} className='glyphicon glyphicon-question-sign'></span>)}
                      </FormattedMessage>
                    </th>
                    <th>
                      <FormattedMessage id='insights.orgName' defaultMessage='Organization Name'/>
                    </th>
                    <th>
                      <FormattedMessage id='insights.lookups' defaultMessage='Lookups'/>
                      <FormattedMessage id='insights.lookupsTooltip' defaultMessage='Total API queries in time period.'>
                        {(text) => (<span data-toggle='tooltip' title={text} className='glyphicon glyphicon-question-sign'></span>)}
                      </FormattedMessage>
                    </th>
                    <th>
                      <FormattedMessage id='insights.grossRevenue' defaultMessage='Gross Revenue'/>
                      <FormattedMessage id='insights.grossRevenueTooltip' defaultMessage='Gross revenue from customer, before discounts.'>
                        {(text) => (<span data-toggle='tooltip' title={text} className='glyphicon glyphicon-question-sign'></span>)}
                      </FormattedMessage>
                    </th>
                    {this.state.period_length == 1 && (
                        <th>
                          <FormattedMessage id='insights.7DaysGrossRevenue' defaultMessage='7 Day Gross Revenue'/>
                          <FormattedMessage id='insights.7DaysGrossRevenueTooltip' defaultMessage='Gross revenue from customer, in the period itself + 7 previous days.'>
                            {(text) => (<span data-toggle='tooltip' title={text} className='glyphicon glyphicon-question-sign'></span>)}
                          </FormattedMessage>
                        </th>)}
                    {this.state.period_length == 1 && (
                        <th>
                          <FormattedMessage id='insights.usageYesterday' defaultMessage='Usage Yesterday'/>
                          <FormattedMessage id='insights.usageYesterdayTooltip' defaultMessage='Usage 1 day before period start day.'>
                            {(text) => (<span data-toggle='tooltip' title={text} className='glyphicon glyphicon-question-sign'></span>)}
                          </FormattedMessage>
                        </th>)}
                    <th>
                      <FormattedMessage id='insights.usage7daysAgo' defaultMessage='Usage 7 days ago'/>
                      <FormattedMessage id='insights.usage7daysAgoTooltip' defaultMessage='Usage of same-length time period, starting 7 days before current. Used mainly for week comparisons.'>
                        {(text) => (<span data-toggle='tooltip' title={text} className='glyphicon glyphicon-question-sign'></span>)}
                      </FormattedMessage>
                    </th>
                    {this.state.period_length == 1 && (
                        <th>
                          <FormattedMessage id='insights.prev7daysAvg' defaultMessage='Previous 7 days average'/>
                          <FormattedMessage id='insights.prev7daysAvgTooltip' defaultMessage='Average daily lookups in the last 7 days (not includning start day).'>
                            {(text) => (<span data-toggle='tooltip' title={text} className='glyphicon glyphicon-question-sign'></span>)}
                          </FormattedMessage>
                        </th>)}
                    {this.state.period_length == 1 && (
                        <th>
                          <FormattedMessage id='insights.last30DaysAvg' defaultMessage='Last 30 day average'/>
                          <FormattedMessage id='insights.last30DaysAvgTooltip' defaultMessage='Average daily lookups in the last 30 days (not includning start day).'>
                            {(text) => (<span data-toggle='tooltip' title={text} className='glyphicon glyphicon-question-sign'></span>)}
                          </FormattedMessage>
                        </th>)}
                    <th>
                      <FormattedMessage id='insights.byDescription' defaultMessage='By Subscription'/>
                      <FormattedMessage id='insights.byDescriptionTooltip' defaultMessage='Breakdown of API calls by the Subscription.'>
                        {(text) => (<span data-toggle='tooltip' title={text} className='glyphicon glyphicon-question-sign'></span>)}
                      </FormattedMessage>
                    </th>
                    <th>
                      <FormattedMessage id='insights.byStatusCode' defaultMessage='By Status code'/>
                      <FormattedMessage id='insights.byStatusCodeTooltip' defaultMessage='Breakdown of API calls by HTTP return status code (200 is OK).'>
                        {(text) => (<span data-toggle='tooltip' title={text} className='glyphicon glyphicon-question-sign'></span>)}
                      </FormattedMessage>
                    </th>
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
                        {this.state.period_length == 1 && (
                                <td><FormattedNumber value={insight.revenue_7_day} currency={'USD'} style={'currency'}/>
                                </td>)}
                        {this.state.period_length == 1 && (
                                <td>
                                  <PercentChange orig={insight.yesterday_usage} curr={insight.total}/>
                                  <FormattedNumber value={Math.round(insight.yesterday_usage)}/>
                                </td>)}
                        <td>
                          <PercentChange orig={insight.before_7} curr={insight.total}/>
                          <FormattedNumber value={Math.round(insight.before_7)}/>
                        </td>
                        {this.state.period_length == 1 && (
                                <td>
                                  <PercentChange orig={insight.average_7} curr={insight.total}/>
                                  <FormattedNumber value={Math.round(insight.average_7)}/>
                                </td>)}
                        {this.state.period_length == 1 && (
                                <td>
                                  <PercentChange orig={insight.average_30} curr={insight.total}/>
                                  <FormattedNumber value={Math.round(insight.average_30)}/>
                                </td>)}
                        <td>
                          {Object.keys(insight.count_by_subscription).map((api_version) => (
                            Object.keys(insight.count_by_subscription[api_version]).map((subscription) => (
                                <span key={subscription}>
                                  <a data-toggle="tooltip" target="_blank"
                                     href={`/pipl_bi/proxy/dashboard/db/api-bi/?var-OrganizationID=${insight.id}&from=${this.state.startDate.format('YYYYMMDDT000000')}&to=${this.state.endDate.format('YYYYMMDDT000000')}&var-DeveloperClass=${subscription}`}
                                     data-original-title={`Show usage graphs for ${subscription}`}>
                                    <strong>{subscription}</strong>: {insight.count_by_subscription[api_version][subscription]}
                                  </a>
                                  <a data-toggle="tooltip" href={`/pipl_bi/debugger/${insight.id}/API_V${api_version}/`} data-original-title={`Analyze ${subscription} queries`} style={{marginLeft: '5px'}}>
                                      <img alt="Show Queries" src={mag}/>
                                  </a>
                                  <br/>
                                </span>
                            ))
                          ))}
                        </td>
                        <td>
                          {Object.keys(insight.count_by_status).map((key) => (
                             <div key={key}><span><strong>{ key }</strong>: { insight.count_by_status[key] }</span><br/></div>
                          ))}
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
