import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import ControllersCheckboxes from './ControllersCheckboxes.jsx';
import KindsCheckboxes from './KindsCheckboxes.jsx';
import ThingsCheckboxes from './ThingsCheckboxes.jsx';

const SHOW_SUCCESS = "showSuccess";

class Footer extends Component {
  handleClick(event) {
    $('#submitModal').modal('show')

    event.preventDefault()
  }

  handleSubmit(event) {
    event.preventDefault()
    const t = event.target;
    t.disabled = true

    const stuff = {
      name: t.name.value,
      description: t.description.value,
      company: t.company.value,
      iconUrl: t.iconUrl.value
    }

    const checkedKinds = _.filter(event.target.kinds, k => { return k.checked})
    const kindIds = _.map(checkedKinds, k => {
      return k.value
    })

    const checkedThings = _.filter(event.target.things, t => { return t.checked })
    const thingIds = _.map(checkedThings, t => {
      return t.value
    })

    Meteor.call("stuffs.insert", stuff, thingIds, kindIds, (error, result) => {
      if(error){
        console.log("error", error);
      }
      if(result) {
        // Reset form values
        t.name.value = ""
        t.description.value = ""
        t.company.value = ""
        t.iconUrl.value = ""

        // Undo checkboxes
        _.each(t.kinds, k => { k.checked = false })
        _.each(t.things, t => { t.checked = false })
        _.each(t.controllers, c => { c.checked = false })

        t.disabled = false;
        // $("#submitModal").modal('hide');
        Session.set(SHOW_SUCCESS, true)
      }
    });
  }

  renderForm() {
    return (
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <h4 className="modal-title" id="myModalLabel">Recommend Stuff</h4>
          <p>Stuff can be an app, a package, an API or anything else that adds functionality to an IoT device.</p>
        </div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="modal-body">
              <h5 className='m-t-1'>Details</h5>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" className="form-control" id="name" aria-describedby="Name" />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea className="form-control" id="description" rows="5"></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="compnay">Company</label>
                <input type="text" className="form-control" id="company" aria-describedby="company" />
              </div>

              <div className="form-group">
                <label htmlFor="iconUrl">Icon URL</label>
                <input type="text" className="form-control" id="iconUrl" aria-describedby="IconURL" />
              </div>

              <h5>Compatible IoT</h5>
              <ThingsCheckboxes />

              <h5 className="m-t-1">Runs on</h5>
              <ControllersCheckboxes />

              <h5 className="m-t-1">Tags</h5>
              <KindsCheckboxes />
          </div>
          <div className="modal-footer">
            <button type="submit" className="btn btn-primary btn-lg btn-block">Submit</button>
          </div>
        </form>
      </div>
    )
  }

  handleAnother() {
    Session.set(SHOW_SUCCESS, false)
  }

  renderSuccess() {
    return (
      <div className="modal-content">

        <div className="modal-body">
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <h1>Stuff Submitted</h1>
          <h4 className='m-y-2'>Your Stuff recommendation has been successfully submitted. It will be reviewed before being made visible to others.</h4>

          <button type="button" className="btn btn-lg btn-primary btn-block" aria-label="submitAnother" onClick={this.handleAnother.bind(this)}>
            Submit Another
          </button>
          <button type="button" className="btn btn-secondary btn-lg btn-block" data-dismiss="modal" aria-label="Close">
            Close
          </button>
        </div>
      </div>
    )
  }

  renderModal() {
    return (
      <div className="modal fade" id="submitModal" ref="submitModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          { this.props.showSuccess ? this.renderSuccess() : this.renderForm() }
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.renderModal()}
        <nav className="navbar navbar-light bg-faded">
          <div className="nav navbar-nav pull-xs-right">
            <a className="nav-item nav-link" href="ioplease">Search</a>
            <a className="nav-item nav-link" href="#" onClick={this.handleClick.bind(this)}>Submit</a>
            <a className="nav-item nav-link" href="https://github.com/marvinmarnold/geeky.rocks" target="_blank">Github</a>
            <a className="nav-item nav-link" href="mailto:marvin@unplugged.im">Contact</a>
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

export default createContainer(({}) => {
  Session.setDefault(SHOW_SUCCESS, false)
  const showSuccess = Session.get(SHOW_SUCCESS)

  return {
    showSuccess,
  };
}, Footer);
