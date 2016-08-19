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
      stuffCount: 0,
      thingName: ''
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

  setQuery(query, thingId, thingName) {
    this.setState({query, thingId, thingName})
  }

  setStuffCount(count) {
    this.setState({stuffCount: count})
  }

  renderResults() {
    if(this.hasQuery()) {
      return (
        <div className="container-fluid text-xs-center" id='content'>
          <div className="row m-b-3">
            <div className="col-xs-12 col-lg-10 offset-lg-1">
              <Results
                query={this.state.query}
                thingId={this.state.thingId}
                thingName={this.state.thingName}
                setStuffCount={this.setStuffCount.bind(this)} />
            </div>
          </div>
        </div>
      )
    } else {
      return <div id='content'></div>
    }
  }

  handleInput(event) {
    this.setQuery(event.target.value)
  }

  render() {
    return (
      <div id='ioplease-index'>
        <div className={this.searchDivClass()}>
          <div className="container-fluid text-xs-center">
            <div className="row">
              <div className="col-xs-10 offset-xs-1">
                {this.hasQuery() ? null : <h1 className='ioplease-title m-b-2'><stong>Do stuff</stong> with your IoThings</h1>}
              </div>
            </div>
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
