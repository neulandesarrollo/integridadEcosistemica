import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';

import { DRAWING_STATES } from '../../../lib/drawing-states.js';

export default class MapControlPanelUI extends Component {

	renderButton() {
		switch(this.props.drawingState) {
			case DRAWING_STATES.DRAWING:
				return <button
								className="btn btn-primary mx-auto ml-1 my-1 btn-block"
								data-toggle="modal"
								data-target="#polygonCreateModal">Save</button>;
			default:
				return <h4 className="ml-1 text-xs-center">{this.props.drawingState}</h4>
		}
	}

  render() {
    return (
			<div className="row">
				<div className="col-xs-6">
					{this.renderButton()}
				</div>
				<div className="col-xs-6 text-xs-center">
					<small><span className="py-1" id='ie-mapa-info'></span></small>
				</div>
			</div>
		);
  }
}

MapControlPanelUI.propTypes = {
	drawingState: PropTypes.string
};
