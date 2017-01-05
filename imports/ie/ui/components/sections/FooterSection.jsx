import React, { Component } from 'react';

export default class FooterSection extends Component {
  render() {
    return (
      <div className="navbar-full text-white bg-inverse py-3 px-2">
        <div className="container-fluid">
          <div className="col-xl-5 col-xs-6">
            <span className="text-small">
							<small>
							Science ipsum. Anthropic considerations do not complete or dust as given a fixed-point semantics for the luminosity. Distances to have. A cosmic. Acceleration these.
							</small>
						</span>
          </div>

          <div className="col-xl-5 col-xs-6 offset-xl-2 text-xs-right">
						<ul className="list-inline">
							<li className="list-inline-item"><h4 className="px-1"><a href="#" className="text-white"><i className="icon ion-social-google"></i></a></h4></li>
							<li className="list-inline-item"><h4 className="px-1"><a href="#" className="text-white"><i className="icon ion-social-facebook"></i></a></h4></li>
							<li className="list-inline-item"><h4 className="px-1"><a href="#" className="text-white"><i className="icon ion-social-twitter"></i></a></h4></li>
						  <li className="list-inline-item"><h4 className="px-1"><a href="#" className="text-white"><i className="icon ion-social-rss"></i></a></h4></li>
						</ul>
          </div>
        </div>
      </div>
    );
  }
}

FooterSection.propTypes = {
};
