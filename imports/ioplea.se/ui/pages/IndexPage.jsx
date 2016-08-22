import React, { Component } from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { algoliaThingsIndex } from '../../client/algolia.js';

import Footer from '../components/Footer.jsx';
import Results from '../components/Results.jsx';
import Search from '../components/Search.jsx';
import Submit from '../components/Submit.jsx';

export default class IndexPage extends Component {
  constructor(props) {
    super(props);
    let query = ""
    let thingId = undefined

    const t = FlowRouter.getQueryParam("t");
    if(!t) {
      const q = FlowRouter.getQueryParam("q");
      if(q)
        query = q
    } else {
      thingId = t
    }

    this.state = {
      query,
      thingId,
      stuffCount: -1,
      searchResults: undefined
    };
  }

  searchByThingId(thingId) {
    const thiz = this

    algoliaThingsIndex(window).getObject(thingId, (err, content) => {
      if (err) {
        console.error(err);
        return;
      }

      thiz.setState({query: content.name, thingId, searchResults: []})
    });
  }

  searchByQuery(query) {
    const thiz = this

    algoliaThingsIndex(window).search(query, (err, content) => {
      if (err) {
        console.error(err);
        return;
      }

      thiz.setState({searchResults: content.hits})

      if(content.hits.length === 1) {
        thiz.setState({thingId: content.hits[0]._id})
      }
    });
  }

  componentDidMount() {
    const thingId = this.state.thingId

    if(thingId) {
      this.searchByThingId(thingId)
    } else {
      if(this.hasQuery())
        this.searchByQuery(this.state.query)
    }
  }

  searchDivClass() {
    return this.hasQuery() ? "ioplease-banner" : "ioplease-banner-full"
  }

  hasQuery() {
    return this.state.query !== ""
  }

  setQuery(query, thingId, searchResults) {
    if(query === "") {
      thingId = undefined
      searchResults = undefined
      stuffCount = -1
    }

    this.setState({query, thingId})
    // Update query parameters based on search
    if(thingId) {
      // Use thingId if defined
      FlowRouter.setQueryParams({t: thingId, q: null});
      this.searchByThingId(thingId)
    } else {
      // Otherwise use the raw text input
      // Do not use this.hasQuery because state has not changed yet
      if(query === "") {
        FlowRouter.setQueryParams({q: null});
      } else {
        FlowRouter.setQueryParams({q: encodeURI(query), t: null});
        this.searchByQuery(query)
      }
    }
  }

  setStuffCount(count) {
    this.setState({stuffCount: count})
  }

  renderResults() {
    if(this.hasQuery()) {
      return (
        <div className="container-fluid text-xs-center" id='content'>
          <div className="row m-b-3">
            <div className="col-xs-12 col-xl-10 offset-xl-1">
              <Results
                query={this.state.query}
                setQuery={this.setQuery.bind(this)}
                thingId={this.state.thingId}
                searchResults={this.state.searchResults}
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
                  hasQuery={this.hasQuery()}
                  query={this.state.query}
                  thingId={this.state.thingId}
                  stuffCount={this.state.stuffCount}
                  searchResults={this.state.searchResults} />
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
