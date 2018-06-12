'use strict';

import React, { Component } from 'react';
import { ClickOutsideContext } from '../click-outside/click-outside.context.js';
import Card from '../card/card.component.js';
import matchFunctions from './match.functions.js';
import './match.less';

class Match extends Component {
  	constructor(props) {
    	super(props);
        this.state = {
        	match: null,
        };
        this.checkMatch = (value, match, callback) => {
            this.setState(this.props.checkMatch(this.state, value, match, callback));
        };
        this.clearMatch = () => {
        	let _state = this.state;
        	_state.match = null;
        	this.setState(_state);
        };
    }

    componentDidMount() {
    	this.props.newGame();
    	this.props.clearMatch(this.clearMatch);
    }

	render() {
		const { checkMatch } = this;
		const { cards } = this.props;

		const _cards = cards.map((card, index) => 
			<ClickOutsideContext.Consumer key={card.value}>
				{context => {
					const _props = {
						value: card.value, 
						match: card.match,
						matched: card.matched,
						index: index,
						updateMatched: card.updateMatched,
						checkMatch: checkMatch,
						addClickOutsideEventListener: context.addClickOutsideEventListener,
						removeClickOutsideEventListener: context.removeClickOutsideEventListener,
					}
					return (
						<Card {..._props} />
					);
				}}
			</ClickOutsideContext.Consumer>
		);
		return (
			<div className="match-wrapper" >
				<ul>
					{_cards}
				</ul>
			</div>
		);
	}
}

Match.defaultProps = {
	cards: [],
	newGame: () => {},
	checkMatch: matchFunctions.checkMatch,
	clearMatch: () => {},
};

export default Match;