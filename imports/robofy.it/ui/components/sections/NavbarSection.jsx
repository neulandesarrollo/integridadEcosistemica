import React, { Component } from 'react';

export default class NavbarSection extends Component {
  activeClass(componentPath, baseClass) {
    return (componentPath === this.props.currentPath) ? baseClass + " active" : baseClass;
  }


  handleSignup(event) {
    event.preventDefault()
    console.log("handleSignup");
    const email = event.target.email.value;
    const password = event.target.password.value;

  }

  renderNavbarModal() {
    return (
      <div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
              <h3 className="modal-title">Sign up for Robofy</h3>
              <h4 className="text-muted">Build smart things. Show them off.</h4>

              <form onSubmit={this.handleSignup.bind(this)}>
                <div className="my-2">
                  <div className="form-group row">
                    <label htmlFor="signup-email" className="col-xs-2 col-form-label">Email</label>
                    <div className="col-xs-10">
                      <input className="form-control form-control-lg" type="email" id="signup-email" name="email" />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label htmlFor="signup-password" className="col-xs-2 col-form-label">Password</label>
                    <div className="col-xs-10">
                      <input className="form-control form-control-lg" type="password" id="signup-password" name="password" />
                    </div>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary btn-lg">Sign up</button>
              </form>
            </div>

          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="navbar-section">
        {this.renderNavbarModal()}
        <nav className="navbar navbar-light bg-faded">
          <button className="navbar-toggler hidden-lg-up" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"></button>
          <div className="collapse navbar-toggleable-md" id="navbarResponsive">
            <a className="navbar-brand" href="/robofy.it">Robofy</a>
            <ul className="nav navbar-nav">
              <li className={this.activeClass("signup", "nav-item")}>
                <a className="nav-link" href="#" data-toggle="modal" data-target="#myModal">Sign Up <span className="sr-only">(current)</span></a>
              </li>
            </ul>
            <form className="form-inline float-lg-right">
              <input className="form-control mr-1" type="text" placeholder="Email address" />
              <button className="btn btn-outline-success" type="submit">Sign In</button>
            </form>
          </div>
        </nav>
      </div>
    );
  }
}

NavbarSection.propTypes = {
  currentPath: React.PropTypes.string
};
