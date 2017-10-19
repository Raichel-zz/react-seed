import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Left side column. contains the logo and sidebar
export default class Header extends Component {

  render() {
    return (<aside className="main-sidebar">

      {/* sidebar: style can be found in sidebar.less */}
      <section className="sidebar">

        {/* Sidebar Menu */}
        <ul className="sidebar-menu" data-widget="tree">
          <li className="header">HEADER</li>
          {/* Optionally, you can add icons to the links */}
          <li className="active"><a href="#"><i className="fa fa-link"></i> <span>Link</span></a></li>
          <li><a href="#"><i className="fa fa-link"></i> <span>Another Link</span></a></li>
          <li className="treeview">
            <a href="#"><i className="fa fa-link"></i> <span>Multilevel</span>
              <span className="pull-right-container">
                    <i className="fa fa-angle-left pull-right"></i>
                  </span>
            </a>
            <ul className="treeview-menu">
              <li><a href="#">Link in level 2</a></li>
              <li><a href="#">Link in level 2</a></li>
            </ul>
          </li>
        </ul>
        {/* /.sidebar-menu */}
      </section>
      {/* /.sidebar */}
    </aside>);
  }
}