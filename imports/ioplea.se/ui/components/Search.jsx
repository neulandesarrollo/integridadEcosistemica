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
    // console.log('onFocus');
    const input = $('#iothing-autocomplete')
    input.focus();

    // The hack below is supposed to make sure the cursor always focuses to the end of the line.
    // Potentially causing trouble inputting/deleting on mobile.
      // var tmpStr = input.val();
      // input.val('');
      // input.val(tmpStr);
  }

  componentDidUpdate() {
    // this.focus()
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
    return !this.props.hasQuery() ? <span className="form-text ioplease-hint">Device name, manufacturer, etc.</span> : null;
  }

  renderCount() {
    const countLoaded = this.props.hasQuery() && (this.props.stuffCount > -1)
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
      <form id='ioplease-search' className="form-inline" onSubmit={this.handleSubmit.bind(this)}>
          {this.renderCount()}
          <div className="input-group ioplease-search-box">
            <input
              placeholder="I own a..."
              className="form-control form-control-lg"
              id="iothing-autocomplete"
              ref="iopleaseSearchAutocomplete"
              onChange={this.handleInput.bind(this)} />
            <div className="input-group-addon" id="ioplease-shuffle" onClick={this.props.shuffle.bind(this)}><span className="fa fa-random"></span></div>
          </div>
          {this.renderHelper()}
      </form>
    );
  }
}
