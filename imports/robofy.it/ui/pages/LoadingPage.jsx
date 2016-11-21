import React, { Component } from 'react';

export default class LoadingPage extends Component {
  componentDidMount() {
    console.log('loading did mount');
    console.log(this.props.token);
  }

  render() {
    return (
      <div id="robofy-loading">
        <h1>Loading</h1>
        {this.props.token}
      </div>
    )
  }
}

LoadingPage.propTypes = {
  token: React.PropTypes.string
}
