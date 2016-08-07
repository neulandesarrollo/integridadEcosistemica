import React, { Component } from 'react';

import Footer from '../components/Footer.jsx';
import Results from '../components/Results.jsx';
import Search from '../components/Search.jsx';
import Submit from '../components/Submit.jsx';


export default class IndexPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
      thingId: undefined
    };
  }

  hasQuery() {
    return this.state.query !== ""
  }

  setQuery(query, thingId) {
    this.setState({query, thingId})
  }

  renderSearchDiv() {
    return (
      <div className="container-fluid text-xs-center">
        <h1 className='ioplease-title'><stong>Do stuff</stong> with your IoThings</h1>
        <div className="row">
          <div className="col-xs-12 col-sm-10 offset-sm-1 col-md-6 offset-md-3">
            <Search setQuery={this.setQuery.bind(this)}/>
          </div>
        </div>
      </div>
    )
  }

  renderWQuery() {
    return (
      <div id='ioplease-index'>
        <div className="ioplease-banner">
          {this.renderSearchDiv()}
        </div>

        <div className="container-fluid text-xs-center" id='content'>
          <div className="row">
            <div className="col-xs-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2">
              <Results query={this.state.query} thingId={this.state.thingId} />
            </div>
          </div>
        </div>

        <div id="ioplease-footer">
          <div className="container">
            <Footer />
          </div>
        </div>
      </div>
    );
  }

  renderWOQuery() {
    return (
      <div id='ioplease-index'>
        <div className="ioplease-banner-full">
          {this.renderSearchDiv()}
        </div>

        <div id="ioplease-footer">
          <div className="container">
            <Footer />
          </div>
        </div>
      </div>
    )
  }

  render() {
    if(this.hasQuery()) {
      return this.renderWQuery();
    } else {
      return this.renderWOQuery();
    }
  }
}
