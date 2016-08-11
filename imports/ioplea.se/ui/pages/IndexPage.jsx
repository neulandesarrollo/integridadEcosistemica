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
      thingId: undefined,
      stuffCount: 0
    };
  }

  searchDivClass() {
    if(this.hasQuery()) {
      return "ioplease-banner"
    } else {
      return "ioplease-banner-full"
    }
  }

  hasQuery() {
    return this.state.query !== ""
  }

  setQuery(query, thingId) {
    this.setState({query, thingId})
  }

  setStuffCount(count) {
    this.setState({stuffCount: count})
  }

  renderResults() {
    if(this.hasQuery()) {
      return (
        <div className="container-fluid text-xs-center" id='content'>
          <div className="row m-b-3">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <Results
                query={this.state.query}
                thingId={this.state.thingId}
                setStuffCount={this.setStuffCount.bind(this)} />
            </div>
          </div>
        </div>
      )
    } else {
      return <div id='content'></div>
    }
  }

  render() {
    return (
      <div id='ioplease-index'>
        <div className={this.searchDivClass()}>
          <div className="container-fluid text-xs-center">
            {this.hasQuery() ? null : <h1 className='ioplease-title'><stong>Do stuff</stong> with your IoThings</h1>}
            <div className="row">
              <div className="col-xs-12 col-sm-10 offset-sm-1 col-md-6 offset-md-3">
                <Search
                  setQuery={this.setQuery.bind(this)}
                  query={this.state.query} hasQuery={this.hasQuery()}
                  stuffCount={this.state.stuffCount} />
              </div>
            </div>
          </div>
        </div>

        {this.renderResults()}

        <div id="ioplease-footer">
          <Footer />
        </div>
      </div>
    )
  }

}
