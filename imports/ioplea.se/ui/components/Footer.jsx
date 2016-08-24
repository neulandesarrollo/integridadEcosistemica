import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Footer extends Component {

  render() {
    return (
      <div>
        <nav className="navbar navbar-light bg-faded navbar-full">
          <div className="nav navbar-nav pull-xs-right">
            <a className="nav-item nav-link" href="/ioplease">Search</a>
            <a className="nav-item nav-link" href="https://github.com/marvinmarnold/geeky.rocks" target="_blank">Github</a>
            <a className="nav-item nav-link" href="mailto:marvin@unplugged.im">Contact</a>
            <a className="nav-item nav-link" href="/ioplea.se/marvin_unplugged2_pub.asc" target="_blank">PGP</a>
          </div>
          <div className="nav navbar-nav pull-xs-right pull-sm-left">
            <span className="nav-item nav-link"><img src='ioplea.se/algolia_light.svg' className="img algolia-icon"></img></span>
            <a className="nav-item nav-link" href="http://creativecommons.org/licenses/by-nc/4.0/"><img alt="Creative Commons License" src="https://i.creativecommons.org/l/by-nc/4.0/88x31.png" /></a>
          </div>
        </nav>
      </div>
    )
  }
}

// <a className="nav-item nav-link" href="/submit" onClick={this.handleClick.bind(this)}>Submit</a>
