import React, { Component } from 'react';
import ReactDisqusThread from 'react-disqus-thread';

import CompatibleWith from '../components/CompatibleWith.jsx';
import DownloadOptions from '../components/DownloadOptions.jsx';
import Footer from '../components/Footer.jsx';
import KindsBadges from '../components/KindsBadges.jsx';

import { Stuffs } from '../../common/collections/stuffs.js';

// import Footer from '../components/Footer.jsx';

export default class StuffPage extends Component {

  renderTitleRow() {
    const stuff = this.props.stuff

    return (
      <div className="row m-t-2">
        <div className="col-sm-4 col-xs-12">
          <img src={stuff.iconUrl} className="img img-fluid m-x-auto"></img>
        </div>
        <div className="col-sm-8 col-xs-12">
          <h3 className="card-title m-t-1"><strong>{stuff.name}</strong> <small className='text-muted'>by {stuff.company}</small></h3>
          <KindsBadges stuffId={stuff._id} />
        </div>
      </div>
    )
  }

  handleNewComment(comment) {
  }

  render() {
    if(this.props.loading) {
      return <h2 className="text-xs-center"><i className="fa fa-cog fa-spin fa-3x fa-fw m-t-3"></i></h2>
    } else {
      const stuff = this.props.stuff
      const path = "http://www.geeky.rocks" + FlowRouter.current().path

      return (
        <div id="ioplease-stuff">
          <div className="container">
            <a className="btn btn-link btn-lg" href={"/ioplease"}>&lt; Back to search</a>
            <div className="row">
              <div className="col-md-8 col-xs-12">
                {this.renderTitleRow()}
                <p className="card-text m-y-2">{stuff.description}</p>
                <DownloadOptions stuffId={stuff._id} />
                <div className="m-b-3">
                  <CompatibleWith stuffId={stuff._id} setQuery={this.props.setQuery} />
                </div>
              </div>
              <div className="col-md-4 col-xs-12">
                <ReactDisqusThread
                  shortname={Meteor.settings.public.DISQUS_SHORTCODE}
                  identifier={stuff._id}
                  title={stuff.name}
                  url={path}
                  onNewComment={this.handleNewComment} />
              </div>
            </div>
          </div>

          <div id="ioplease-footer">
            <Footer />
          </div>
        </div>
      )
    }
  }
}
