import React, { Component } from 'react';

export default class Footer extends Component {
  render() {
    return (
      <nav className="navbar navbar-fixed-bottom navbar-light bg-faded">
        <div className="nav navbar-nav pull-xs-right">
          <a className="nav-item nav-link" href="ioplease-search">Search</a>
          <a className="nav-item nav-link" href="ioplease-submit">Submit</a>
          <a className="nav-item nav-link" href="https://github.com/marvinmarnold/nola-data">Github</a>
          <a className="nav-item nav-link" href="mailto:marvin@unplugged.im">Contact</a>
          <a className="nav-item nav-link" href="http://creativecommons.org/licenses/by-nc/4.0/"><img alt="Creative Commons License" src="https://i.creativecommons.org/l/by-nc/4.0/88x31.png" /></a>
        </div>
      </nav>
    )
  }
}
