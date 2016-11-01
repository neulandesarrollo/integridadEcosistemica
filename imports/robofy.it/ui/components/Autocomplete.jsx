import React, { Component } from 'react';

export default class Autocomplete extends Component {
  handleClick(event, thing) {
    event.preventDefault()
    this.props.setQuery(thing.name, thing.objectID)
    this.props.resetSearch(thing.name)
  }

  renderThing(thing) {
    const thiz = this
    return (
      <a href="#" onClick={(event) => {thiz.handleClick(event, thing)}} key={thing.objectID}><span className="tag tag-pill tag-primary m-r-1 m-b-1">{thing.name}</span></a>
    )
  }

  render() {
    if(this.props.things.length > 1) {
      return (
        <div>
          <h5 className='m-t-1'>
            <small><span className="text-muted">Did you mean: </span></small>{this.props.things.map(this.renderThing.bind(this))}
          </h5>
        </div>
      )
    } else {
      return null;
    }
  }
}
