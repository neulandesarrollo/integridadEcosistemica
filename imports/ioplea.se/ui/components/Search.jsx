import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Search extends Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(newProps) {
    ReactDOM.findDOMNode(this.refs.iopleaseSearchAutocomplete).focus();
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

  renderResultsCount() {
    return this.props.stuffCount == 1 ? "result" : "results"
  }

  renderHelper() {
    return !this.props.hasQuery ? <span className="form-text ioplease-hint">Device name, manufacturer, etc.</span> : null;
  }

  renderCount() {
    const countLoaded = this.props.hasQuery && (this.props.stuffCount > -1)
    return countLoaded ?  <h4 className='ioplease-count'>{this.props.stuffCount} {this.renderResultsCount()}</h4> :
                          null
  }

  handleInput(event) {
    this.handleSearch(event, event.target.value)
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <form id='ioplease-search' onSubmit={this.handleSubmit.bind(this)}>
          {this.renderCount()}
          <div className="ioplease-search-box">
            <input
              placeholder="I want to do something with my..."
              className="form-control form-control-lg"
              id="iothing-autocomplete"
              ref="iopleaseSearchAutocomplete"
              onChange={this.handleInput.bind(this)} />
          </div>
          {this.renderHelper()}
      </form>
    );
  }
}
