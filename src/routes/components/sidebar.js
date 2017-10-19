import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

// Left side column. contains the logo and sidebar
export default class Header extends Component {

  render() {
    return (<aside className='main-sidebar'>

      {/* sidebar: style can be found in sidebar.less */}
      <section className='sidebar'>

        {/* Sidebar Menu */}
        <ul className='sidebar-menu' data-widget='tree'>
          <li className='header'>HEADER</li>
          {/* Optionally, you can add icons to the links */}
          <Route exact path='/customers' children={(props) => {
            return (<li className={props.match ? 'active' : ''}><NavLink activeClassName='active' to={'/customers'}><i
                className='fa fa-link'></i><span>Customers</span></NavLink></li>);
          }}/>
          <Route exact path='/users' children={(props) => {
            return (<li className={props.match ? 'active' : ''}><NavLink activeClassName='active' to={'/users'}><i
                className='fa fa-link'></i><span>Users</span></NavLink></li>);
          }}/>
          <Route path='/insights' children={(props) => {
            return (<li className={props.match ? 'active' : ''}><NavLink activeClassName='active' to={'/insights/top'}><i
                className='fa fa-link'></i>
              <span>Insights</span>
              <span className='pull-right-container'>
                <i className='fa fa-angle-left pull-right'></i>
              </span></NavLink>

              <ul className='treeview-menu'>
                <Route exact path='/insights/top' children={(props) => {
                  return (<li className={props.match ? 'active' : ''}><NavLink to={'/insights/top'} >Top</NavLink></li>);
                }}/>
                <Route exact path='/insights/my-customers' children={(props) => {
                  return (<li className={props.match ? 'active' : ''}><NavLink to={'/insights/my-customers'} >My Customers</NavLink></li>);
                }}/>
              </ul>
            </li>);
          }}/>
        </ul>
        {/* /.sidebar-menu */}
      </section>
      {/* /.sidebar */}
    </aside>);
  }
}