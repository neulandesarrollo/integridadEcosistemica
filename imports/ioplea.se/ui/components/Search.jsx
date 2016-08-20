import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Session } from 'meteor/session'
import { createContainer } from 'meteor/react-meteor-data';
import Autocomplete from 'react-autocomplete';

import { Things } from '../../common/collections/things.js';

import { algoliaThingsIndex } from '../../client/algolia.js';

const styles = {
  item: {
    padding: '2px 6px',
    cursor: 'default'
  },

  highlightedItem: {
    color: 'white',
    background: 'hsl(200, 50%, 50%)',
    padding: '2px 6px',
    cursor: 'default'
  },

  menu: {
    border: 'solid 1px #ccc'
  }
}

class Search extends Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(newProps) {
    ReactDOM.findDOMNode(this.refs.iopleaseSearchAutocomplete).focus();

    // const isThingsDefault = (this.state.things.length > 0) && ("isDefault" in this.state.things[0])
    //
    // if(isThingsDefault && newProps.things.length > 0) {
    //   this.setState({things: newProps.things})
    // }
  }

  componentWillUnmount() {
  }

  componentDidMount() {
    this.focus()
    // this.handleSearch(undefined, this.props.query, this.props.thingId)
  }

  focus() {
    const input = $('#iothing-autocomplete')
    input.focus();
    var tmpStr = input.val();
    input.val('');
    input.val(tmpStr);
  }

  componentDidUpdate() {
    this.focus()
  }

  handleSearch(event, value, thingId) {
    const thiz = this;
    if(event)
      event.preventDefault()

    this.setState({ value })
    this.props.setQuery(value, thingId)
  }


  renderItem(item, isHighlighted) {
    return (
      <div
        style={isHighlighted ? styles.highlightedItem : styles.item}
        key={item._id}>{item.name}</div>
    )
  }

  renderResultsCount() {
    return this.props.stuffCount == 1 ? "result" : "results"
  }

  renderHelper() {
    return !this.props.hasQuery ? <span className="form-text ioplease-hint">Device name, manufacturer, etc.</span> : null;
  }

  renderCount() {
    const countLoaded = this.props.hasQuery && (this.props.stuffCount > -1)
    return countLoaded ?  <h4 className='ioplease-count'>{this.props.stuffCount} {this.renderResultsCount()}</h4> :
                          <h4 className='ioplease-count'>Loading...</h4> ;
  }

  handleInput(event) {
    this.handleSearch(event, event.target.value)
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  renderInput() {
    if(this.props.hasQuery) {
      return (
        <Autocomplete
          inputProps={{
              className: "form-control form-control-lg",
              id: "iothing-autocomplete",
              placeholder: "I want to do something with my...",
              type: "text"
            }}
            wrapperStyle={{}}
            wrapperProps={{className: 'ioplease-search-box'}}
            ref="iopleaseSearchAutocomplete"
            value={this.props.query}
            items={this.props.things}
            getItemValue={(item) => item.name}
            onSelect={(value, item) => {
              // set the menu to only the selected item
              this.handleSearch(undefined, value, item.objectID)
            }}
            onChange={this.handleSearch.bind(this)}
            renderItem={this.renderItem.bind(this)}
        />
      )
    } else {
      return (
        <div className="ioplease-search-box">
          <input
            placeholder="I want to do something with my..."
            className="form-control form-control-lg"
            id="iothing-autocomplete"
            ref="iopleaseSearchAutocomplete"
            onChange={this.handleInput.bind(this)} />
        </div>
      )
    }
  }

  render() {
    return (
      <form id='ioplease-search' onSubmit={this.handleSubmit.bind(this)}>
        <div className="form-group">
          {this.renderCount()}
          {this.renderInput()}
          {this.renderHelper()}
        </div>
      </form>
    );
  }
}

export default createContainer(({setQuery, query, hasQuery, stuffCount, thingId, searchResults}) => {
  Session.setDefault("hits", [{name: "Loading...", isDefault: true}]);

  const client = window.algoliasearch(
    Meteor.settings.public.AGOLIA_SEARCH.applicationID,
    Meteor.settings.public.AGOLIA_SEARCH.searchApiKey
  );

  if(!searchResults) {
    searchResults = [{name: "No results."}]
  }

  return {
    things: searchResults,
    setQuery,
    query,
    thingId,
    hasQuery,
    stuffCount
  };
}, Search);
