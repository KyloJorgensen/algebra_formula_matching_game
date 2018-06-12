'use strict';

import React, { Component } from 'react';
import cardFunctions from './card.functions.js';
import op from 'object-path';
import './card.less';

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
        	className: "card",
        	matched: false,
        };

    	this.handleClick = () => this.setState(this.props.handleClick(this.state, this.props, this.props.checkMatch, this.props.value, this.props.match, this.checkMatchResult));

    	this.checkMatchResult = result => this.setState(this.props.checkMatchResult(this.state, this.props, result));

    	this.setWrapperRef = (node) => {
			this.wrapperRef = node;
		};

    	this.handleClickOutside = (event) => this.setState(this.props.handleClickOutside(this.state, this.props, (this.wrapperRef && !this.wrapperRef.contains(event.target))));
    }

	componentDidMount() {
		this.props.addClickOutsideEventListener(this.props.value, this.handleClickOutside);
	}

	componentDidUpdate() {
		if (this.props.matched && this.state.className !== 'card matched') {
			const _state = this.state;
			_state.className = 'card matched';
			this.setState(_state);
		}
		if (!this.props.matched && this.state.className == 'card matched') {
			const _state = this.state;
			_state.className = 'card';
			this.setState(_state);
		}
	}

	componentWillUnmount() {
		this.props.removeClickOutsideEventListener(this.props.value);
	}


	render() {
		const { handleClick } = this;
		const { className } = this.state;
		return (
			<li className={className} ref={this.setWrapperRef} onClick={handleClick} >
				<div>{className !== "card" ? this.props.value : ''}</div>
			</li>
		);
	}
}

Card.defaultProps = {
	value: 'loading',
	match: 'loading',
	index: 0,
	matched: false,	
	updateMatched: () => {throw new Error('Error: no updateMatched prop given')},
	checkMatch: () => {throw new Error('Error: no checkMatch prop given')},
	addClickOutsideEventListener: () => {throw new Error('Error: no addClickOutsideEventListener prop given')},
	removeClickOutsideEventListener: () => {throw new Error('Error: no removeClickOutsideEventListener prop given')},
	handleClick: cardFunctions.handleClick,
	checkMatchResult: cardFunctions.checkMatchResult,
	handleClickOutside: cardFunctions.handleClickOutside,
};

export default Card;