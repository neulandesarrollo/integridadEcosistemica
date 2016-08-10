import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Session } from 'meteor/session'
import { createContainer } from 'meteor/react-meteor-data';
import Autocomplete from 'react-autocomplete';
// import algoliasearch from 'algoliasearch';


import { Things } from '../../common/collections/things.js';

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
      value: '',
      things: props.things
    };
  }

  componentWillReceiveProps(newProps) {
    const isThingsDefault = (this.state.things.length > 0) && ("isDefault" in this.state.things[0])

    if(isThingsDefault && newProps.things.length > 0) {
      this.setState({things: newProps.things})
    }
  }

  componentDidMount() {
    ReactDOM.findDOMNode(this.refs.iopleaseSearchAutocomplete).focus();
  }

  handleSearch(event, value, thingId) {
    const thiz = this;
    if(event)
      event.preventDefault()

    const client = window.algoliasearch(
      Meteor.settings.public.AGOLIA_SEARCH.applicationID,
      Meteor.settings.public.AGOLIA_SEARCH.searchApiKey
    );

    const thingsIndex = client.initIndex('things');

    thingsIndex.search(value, (err, content) => {
      if (err) {
        // console.error(err);
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

  render() {
    return (
      <form className='m-t-2' id='ioplease-search'>
        <div className="form-group">
          <Autocomplete
            inputProps={{
                className: "form-control form-control-lg",
                id: "iothing-autocomplete",
                placeholder: "I want to do something with my...",
                type: "text",
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
        <small className="form-text ioplease-hint">Device name, manufacturer, etc.</small>
        </div>
      </form>
    );
  }
}

export default createContainer(({setQuery}) => {
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

  }

  return {
    things,
    setQuery
  };
}, Search);
