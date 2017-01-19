import React, { Component, PropTypes } from 'react';

import ResponsesListContainer from '../../containers/ResponsesListContainer.jsx';
import AnswersListContainer from '../../containers/AnswersListContainer.jsx';

export default class ResponsesSection extends Component {
	constructor(props) {
		super(props)

		this.state = {
			currentUserId: null,
			currentResponseId: null
		}
	}

	_setCurrentId(currentUserId, currentResponseId) {
		this.setState({ currentUserId, currentResponseId })
	}

  render() {
		if(!this.props.currentPolygonId)
			return <h6 className="text-xs-center">You must select a polygon first!</h6>;

    return (
			<div className="row">
				<div className="col-xs-12 col-md-6">

					<ResponsesListContainer
						currentPolygonId={this.props.currentPolygonId}
						currentUserId={this.state.currentUserId}
						setCurrentId={this._setCurrentId.bind(this)} />
				</div>

				<div className="col-xs-12 col-md-6">

					<AnswersListContainer
						currentResponseId={this.state.currentResponseId} />
				</div>
			</div>
    );
  }
}

ResponsesSection.propTypes = {
	currentPolygonId: PropTypes.string
};
