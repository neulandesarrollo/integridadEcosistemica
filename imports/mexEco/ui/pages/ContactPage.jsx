import { Meteor } from 'meteor/meteor';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class ContactPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <div>
        <div id='mexEco-contact-title'>
          <div className="container-fluid">
            <div className="row p-y-3">
              <div className="col-xs-10 offset-xs-1 col-md-8 offset-md-2 col-xl-6 offset-xl-3">
                <img className="img-fluid m-x-auto d-block" id="mexEco-index-title-img" src="mexEco/logo-white.png" />
              </div>
            </div>
          </div>
        </div>
        <div id='mexEco-contact-contact'>
          <div className="container-fluid">
            <div className="row p-y-2">
              <div className="col-md-4 col-sm-5 offset-sm-1 col-xs-12 push-sm-5">
                <h5>Queremos saber más de ti, déjanos tus datos, colabora con nosotros y se parte de la historia de este diverso pais.</h5>
              </div>
              <div className="col-md-4 col-sm-5 offset-md-1 col-xs-12 pull-sm-5">
                <form>
                  <div className="form-group">
                    <label htmlFor="name">Tu nombre</label>
                    <input type="text" className="form-control input-lg" id="name" aria-describedby="Tu nombre" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Tu correo</label>
                    <input type="text" className="form-control input-lg" id="email" aria-describedby="Tu correo" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Tu mensaje</label>
                    <textarea className="form-control form-control-sm" id="message" rows="3"></textarea>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ContactPage.propTypes = {
};
