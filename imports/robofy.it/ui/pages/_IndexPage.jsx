import React, { Component } from 'react'
import { FlowRouter } from 'meteor/kadira:flow-router'

import { piwik } from 'meteor/marvin:piwik-http-sandstorm'

import { algoliaThingsIndex } from '../../client/algolia.js'

import Autocomplete from '../components/Autocomplete.jsx'
import Footer from '../components/Footer.jsx'
import Search from '../components/Search.jsx'
import Browse from '../components/Browse.jsx'

import ResultsContainer from '../containers/ResultsContainer.jsx'

export default class IndexPage extends Component {
  constructor(props) {
    super(props);
    console.log('indexConstructed');
    let query = ""
    let thingId = null
    let kindId = null

    const s = FlowRouter.getQueryParam("s") // sort by field
    const t = FlowRouter.getQueryParam("t") // thingId
    if(!t) {
      const k = FlowRouter.getQueryParam("k") // kindId
      const q = FlowRouter.getQueryParam("q") // query
      if(q) {
        query = q
      } else if(k) {
        kindId = k
      }
    } else {
      thingId = t
    }

    this.state = {
      query,
      kindId,
      searchResults: [],
      sortBy: s,
      stuffCount: -1,
      thingId,
    }
  }

  resetSearch(val) {
    const input = $('#iothing-autocomplete')
    input.val(val)
  }

  shuffle() {
    const thiz = this
    Meteor.call("ioplease.shuffle", (error, result) => {
      if(error) {
        console.log("error", error)
      }

      if(result) {
        thiz.setState({query: result.name, thingId: result._id, searchResults: []})
        FlowRouter.setQueryParams({t: result._id, q: null, k: null})
        thiz.resetSearch(result.name)

        piwik.trackAction('ioplease', 'shuffle')
      }
    });
  }

  searchByThingId(thingId) {
    const thiz = this

    algoliaThingsIndex(window).getObject(thingId, (err, content) => {
      if (err) {
        console.error(err)
        return
      }

      thiz.setState({query: content.name, thingId, searchResults: []})
      thiz.resetSearch(content.name)
    });
  }

  searchByQuery(query) {
    const thiz = this

    algoliaThingsIndex(window).search(query, (err, content) => {
      if (err) {
        console.error(err)
        return
      }

      thiz.setState({searchResults: content.hits})

      if(content.hits.length === 1) {
        thiz.setState({thingId: content.hits[0]._id})
      }
    });
  }

  componentDidMount() {
    console.log('indexDidMount');
    const thingId = this.state.thingId

    if(thingId) {
      this.searchByThingId(thingId)
    } else {
      if(this.hasQuery(true)) {
        this.resetSearch(this.state.query)
        this.searchByQuery(this.state.query)
      }
    }

    this.resetHead()
  }

  resetHead() {
    DocHead.removeDocHeadAddedTags()
    DocHead.setTitle("Do stuff with IoT")
    var metaInfo =[
      {
        name: "description",
        content: "Search for IoT products and find out what kind of stuff you can do with them.",
      },
    ]

    _.each(metaInfo, m => {
      DocHead.addMeta(m)
    })
  }

  searchDivClass() {
    return this.hasQuery() ? "ioplease-banner" : "ioplease-banner-full"
  }

  hasQuery(ignoreKindId) {
    let _ignoreKind = false
    if(ignoreKindId)
      _ignoreKind = ignoreKindId

    return (this.state.query !== "") || (!ignoreKindId && this.state.kindId)
  }

  setQuery(query, thingId, searchResults) {
    if(query === "") {
      thingId = undefined
      searchResults = []
      stuffCount = -1
    }

    this.setState({query, thingId})
    // Update query parameters based on search
    if(thingId) {
      // Use thingId if defined
      FlowRouter.setQueryParams({t: thingId, q: null, k: null})
      this.searchByThingId(thingId)
    } else {
      this.resetHead()
      // Otherwise use the raw text input
      // Do not use this.hasQuery because state has not changed yet
      if(query === "") {
        FlowRouter.setQueryParams({q: null})
      } else {
        FlowRouter.setQueryParams({q: encodeURI(query), t: null, k: null})
        this.searchByQuery(query)
      }
    }
  }

  setStuffCount(count) {
    this.setState({stuffCount: count})
  }

  setKindId(kindId) {
    this.setState({ kindId })
  }

  renderResults() {
    if(this.hasQuery()) {
      return (
        <div className="container-fluid text-xs-center" id='content'>
          <Autocomplete
            things={this.state.searchResults}
            setQuery={this.setQuery.bind(this)}
            resetSearch={this.resetSearch.bind(this)} />

          <div className="row m-b-2">
            <div className="col-xs-12 col-xl-10 offset-xl-1">
              <ResultsContainer
                query={this.state.query}
                setQuery={this.setQuery.bind(this)}
                kindId={this.state.kindId}
                thingId={this.state.thingId}
                searchResults={this.state.searchResults}
                setStuffCount={this.setStuffCount.bind(this)}
                sortBy={this.state.sortBy} />
            </div>
          </div>
        </div>
      )
    } else {
      return <Browse setKindId={this.setKindId.bind(this)} />
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
                <div className="hidden-sm-down">
                  {this.hasQuery() ? null : <h1 className='ioplease-title m-b-2'><stong>Do stuff</stong> with your IoThings</h1>}
                </div>
                <div className="hidden-md-up">
                  {this.hasQuery() ? null : <h4 className='ioplease-title m-b-1'><stong>Do stuff</stong> with your IoThings</h4>}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12 col-sm-10 offset-sm-1 col-md-6 offset-md-3">
                <Search
                  setQuery={this.setQuery.bind(this)}
                  hasQuery={this.hasQuery.bind(this)}
                  query={this.state.query}
                  thingId={this.state.thingId}
                  stuffCount={this.state.stuffCount}
                  searchResults={this.state.searchResults}
                  shuffle={this.shuffle.bind(this)} />
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