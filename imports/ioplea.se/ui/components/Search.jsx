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

    this.state = {
      value: props.query ? props.query : '' ,
      things: props.things
    };
  }

  componentWillReceiveProps(newProps) {
    ReactDOM.findDOMNode(this.refs.iopleaseSearchAutocomplete).focus();

    const isThingsDefault = (this.state.things.length > 0) && ("isDefault" in this.state.things[0])

    if(isThingsDefault && newProps.things.length > 0) {
      this.setState({things: newProps.things})
    }
  }

  componentWillUnmount() {
  }

  componentDidMount() {
    this.focus()
  }

  focus() {
    const input = $('#iothing-autocomplete')
    input.focus();
    var tmpStr = input.val();
    input.val('');
    input.val(tmpStr);
    // ReactDOM.findDOMNode(this.refs.iopleaseSearchAutocomplete).focus();
  }

  componentDidUpdate() {
    this.focus()
  }

  handleSearch(event, value, thingId) {
    const thiz = this;
    if(event)
      event.preventDefault()

    algoliaThingsIndex(window).search(value, (err, content) => {
      if (err) {
        console.error(err);
        return;
      }

      thiz.setState({things: content.hits})

      if(content.hits.length > 0)
        this.props.setQuery(value, content.hits[0]._id);
    });

    this.setState({ value })
    this.props.setQuery(value, thingId);
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
    if(this.props.hasQuery) {
      return (
        <h4 className='ioplease-count m-t-1'>{this.props.stuffCount} {this.renderResultsCount()}</h4>
      )
    } else {
      return (
        <small className="form-text ioplease-hint">Device name, manufacturer, etc.</small>
      )
    }
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
            value={this.state.value}
            items={this.state.things}
            getItemValue={(item) => item.name}
            onSelect={(value, item) => {
              // set the menu to only the selected item
              this.setState({ value, things: [ item ] })
              this.handleSearch(undefined, value, item._id)
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
          {this.renderInput()}
          {this.renderHelper()}
        </div>
      </form>
    );
  }
}

export default createContainer(({setQuery, query, hasQuery, stuffCount}) => {
  Session.setDefault("hits", [{name: "Loading...", isDefault: true}]);

  const client = window.algoliasearch(
    Meteor.settings.public.AGOLIA_SEARCH.applicationID,
    Meteor.settings.public.AGOLIA_SEARCH.searchApiKey
  );

  const thingsIndex = client.initIndex('things');

  thingsIndex.search("", (err, content) => {
    if (err) {
      // console.error(err);
      return;
    }
    Session.set("hits", content.hits)
  });

  let things = Session.get("hits")
  if(things.length === 0) {
    things = [{name: "No results."}]
  }

  return {
    things,
    setQuery,
    query,
    hasQuery,
    stuffCount
  };
}, Search);

// <Autocomplete
//   inputProps={{
//       className: "form-control form-control-lg",
//       id: "iothing-autocomplete",
//       placeholder: "I want to do something with my...",
//       type: "text",
//     }}
//     wrapperStyle={{}}
//     wrapperProps={{className: 'ioplease-search-box'}}
//     ref="iopleaseSearchAutocomplete"
//     value={this.state.value}
//     items={this.state.things}
//     getItemValue={(item) => item.name}
//     onSelect={(value, item) => {
//       // set the menu to only the selected item
//       this.setState({ value, things: [ item ] })
//       this.handleSearch(undefined, value, item._id)
//     }}
//     onChange={this.handleSearch.bind(this)}
//     renderItem={this.renderItem.bind(this)}
// />




// <div className="ioplease-search-box">
//   <input className="form-control form-control-lg" id="iothing-autocomplete" ref="iopleaseSearchAutocomplete" />
// </div>
