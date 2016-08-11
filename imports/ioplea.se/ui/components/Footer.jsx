import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Footer extends Component {
  handleClick(event) {
    $('#submitModal').modal('show')

    event.preventDefault()
  }

  render() {
    return (
      <div>
        <div className="modal fade" id="submitModal" ref="submitModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
                <h4 className="modal-title" id="myModalLabel">Recommend Stuff</h4>
                <p>Maybe some text saying that you can't recommend Things.</p>
              </div>
              <div className="modal-body">
                <form>

                  <h5>Details</h5>

                  <h5>Compatibilities</h5>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary btn-lg btn-block">Submit</button>
              </div>
            </div>
          </div>
        </div>
        <nav className="navbar navbar-light bg-faded">
          <div className="nav navbar-nav pull-xs-right">
            <a className="nav-item nav-link" href="ioplease-search">Search</a>
            <a className="nav-item nav-link" href="#" onClick={this.handleClick.bind(this)}>Submit</a>
            <a className="nav-item nav-link" href="https://github.com/marvinmarnold/nola-data">Github</a>
            <a className="nav-item nav-link" href="mailto:marvin@unplugged.im">Contact</a>
            <a className="nav-item nav-link" href="http://creativecommons.org/licenses/by-nc/4.0/"><img alt="Creative Commons License" src="https://i.creativecommons.org/l/by-nc/4.0/88x31.png" /></a>
          </div>
        </nav>
      </div>
    )
  }
}
