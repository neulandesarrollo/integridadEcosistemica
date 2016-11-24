import React, { Component } from 'react';

export default class MachinationSection extends Component {
  authSpotify(machinationId) {
    console.log('authspotify');
    var options = {
      // Whether or not to force the user to approve the app again if they’ve already done so.
      showDialog: true,

      // Spotify access scopes.
      requestPermissions: [
        'user-follow-modify',
        'playlist-modify-private',
        'user-follow-modify'
      ]
    };

    // https://developer.spotify.com/web-api/using-scopes/
    Spotify.requestCredential(options, function(accessToken) {
      const config = {
        name: "spotifyToken",
        value: accessToken,
        machinationId
      }

      Meteor.call("configs.insert", config, (error, result) => {
        if(error) {
          console.log("error", error);
        }
        if(result) {
          console.log("inserted a new config");
          console.log(result);

        }
      });
      console.log("Spotify request complete");

      console.log(accessToken);
    });
  }


  lastFMPath(machinationId) {
    return "//www.last.fm/api/auth/?api_key=" +
      Meteor.settings.public.lastFM.apiKey +
      "&cb=http://localhost:3000/callbacks/lastfm/authorize/" +
      machinationId
  }

  setDSN(event) {
    console.log("setDSN");
    event.preventDefault();
    const dsn = event.target.dsn.value;

    const config = {
      name: "dsn",
      value: dsn,
      machinationId
    }

    Meteor.call("configs.insert", config, (error, result) => {
      if(error) {
        console.log("error", error);
      }
      if(result) {
        console.log("inserted a new config");
        console.log(result);
        event.target.dsn.value("");
      }
    });
  }

  render() {
    const machinationId = this.props.machination._id;

    return (
      <div className="machination-section">
        <h1>{this.props.machination.name}</h1>
        <button className="btn btn-primary mx-1" onClick={() => {
            this.authSpotify(machinationId)
          }}>Link your Spotify</button>

        <a className="btn btn-primary mx-1" href={this.lastFMPath(machinationId)}>Link your Last.FM</a>

      <form onSubmit={event => {
            this.setDSN(event, machinationId);
          }}>
          <input name="dsn"></input>
          <button type="submit" className="btn btn-success">Set DSN</button>
        </form>
      </div>
    );
  }
}

MachinationSection.propTypes = {
  machination: React.PropTypes.object
};
