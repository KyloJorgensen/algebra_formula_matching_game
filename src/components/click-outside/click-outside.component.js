'use strict';

import React, { Component } from 'react';
import op from 'object-path';
import  { ClickOutsideContext } from './click-outside.context.js';
import clickoutsideFunctions from './click-outside.functions.js';

class ClickOutside extends Component {
    constructor(props) {
        super(props);
        this.state = {
        	clickOutsideEventListeners: op({}),
        };

        this.handleClick = event => {
        	Object.values(this.state.clickOutsideEventListeners.get()).forEach(callback => {callback(event)});
        };

		this.addClickOutsideEventListener = (uniqueTag, clickHandler) => {
			const results = this.props.addClickOutsideEventListener(this.state, uniqueTag, clickHandler);
			this.setState(results._state);
			return results.added;
		};

		this.removeClickOutsideEventListener = (uniqueTag) => {
			const results = this.props.removeClickOutsideEventListener(this.state, uniqueTag);
			this.setState(results._state)
			return results.deleted;
		};
    }

	render() {
		const { addClickOutsideEventListener, removeClickOutsideEventListener, handleClick } = this;
		const { mouseDown } = this.state;
		const context = {
			addClickOutsideEventListener: addClickOutsideEventListener,
			removeClickOutsideEventListener: removeClickOutsideEventListener,
		}
		return (
			<ClickOutsideContext.Provider value={context}>
				<div onClick={handleClick} >
					{this.props.children}
				</div>
			</ClickOutsideContext.Provider>
		);
	}
}

ClickOutside.defaultProps = {
	addClickOutsideEventListener: clickoutsideFunctions.addClickOutsideEventListener,
	removeClickOutsideEventListener: clickoutsideFunctions.removeClickOutsideEventListener,
};

export default ClickOutside;