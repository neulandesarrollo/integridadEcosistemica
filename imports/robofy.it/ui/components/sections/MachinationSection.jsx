import React, { Component } from 'react';

export default class MachinationSection extends Component {
  lastFMPath() {
    return "//www.last.fm/api/auth/?api_key=" + Meteor.settings.public.lastFM.apiKey + "&cb=http://localhost:3000/callbacks/lastfm/authorize"
  }

  render() {
    return (
      <div className="machination-section">
        <h1>{this.props.machination.name}</h1>
        <button className="btn btn-primary">Link your Spotify</button>
        <a className="btn btn-primary" href={this.lastFMPath()}>Link your Last.FM</a>
        <input name="dsn"></input>
      </div>
    );
  }
}

MachinationSection.propTypes = {
  machination: React.PropTypes.object
};
