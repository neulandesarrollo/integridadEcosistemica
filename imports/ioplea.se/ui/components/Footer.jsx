import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import ControllersCheckboxes from './ControllersCheckboxes.jsx';
import KindsCheckboxes from './KindsCheckboxes.jsx';
import ThingsCheckboxes from './ThingsCheckboxes.jsx';

const SHOW_SUCCESS = "showSuccess";
const ERRORS = "ioplease-errors-"

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
      if(error) {
        let errors = JSON.parse(error.details)
        errors = _.object(_.map(errors, (e) => {
          return [e.name, e.type]
        }))

        Session.set(ERRORS, errors)
      }
      if(result) {
        Session.set(ERRORS, {})

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

  formGroup(attr) {
    return this.props.errors[attr] ? "form-group has-danger" : "form-group"
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
              <div className={this.formGroup("name")}>
                <label htmlFor="name">Name</label>
                <input type="text" className="form-control form-control-sm" id="name" aria-describedby="Name" />
                <div className="form-control-feedback">Name is required</div>
              </div>

              <div className={this.formGroup("description")}>
                <label htmlFor="description">Description</label>
                <textarea className="form-control form-control-sm" id="description" rows="3"></textarea>
                <div className="form-control-feedback">Description is required</div>
              </div>

              <div className={this.formGroup("company")}>
                <label htmlFor="company">Company</label>
                <input type="text" className="form-control form-control-sm" id="company" aria-describedby="company" />
                <div className="form-control-feedback">Company is required</div>
              </div>

              <div className={this.formGroup("iconUrl")}>
                <label htmlFor="iconUrl">Icon URL</label>
                <input type="text" className="form-control form-control-sm" id="iconUrl" aria-describedby="IconURL" />
                <div className="form-control-feedback">You must enter an icon URL</div>
                <small className="form-text text-muted">Address to a logo or picture for the Stuff.</small>
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
            {this.hasErrors() ? <h4 className="text-xs-left text-danger m-t-1">Fix errors above</h4> : null}
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

  hasErrors() {
    return _.keys(this.props.errors).length > 0
  }

  render() {
    return (
      <div>
        {this.renderModal()}
        <nav className="navbar navbar-light bg-faded">
          <div className="nav navbar-nav pull-xs-right">
            <a className="nav-item nav-link" href="/ioplease">Search</a>
            <a className="nav-item nav-link" href="/submit" onClick={this.handleClick.bind(this)}>Submit</a>
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

export default createContainer(({}) => {
  Session.setDefault(SHOW_SUCCESS, false)
  const showSuccess = Session.get(SHOW_SUCCESS)
  const errors = Session.get(ERRORS) || {}

  return {
    showSuccess,
    errors
  };
}, Footer);
