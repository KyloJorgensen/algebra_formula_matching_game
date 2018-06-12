'use strict';

const cardFunctions = {
	handleClick: (state, props, checkMatch, value, match, checkMatchResult) => {
		if (!props.matched && state.className !== "card match selected") {
			state.className = "card match selected";
			checkMatch(value, match, checkMatchResult);
			return state;
		} else {
			return state;
		}
	},
	checkMatchResult: (state, props, result) => {
		if (result) {
			// state.className = 'card matched';
			props.updateMatched(true, props.index);
		} else {
		 	state.className = 'card selected';
		}
		return state;
	},
	handleClickOutside: (state, props, outside) => {
		if (outside && !props.matched && state.className !== 'card selected' && state.className !== 'card match selected') {
			state.className = 'card';
		} else if (state.className == 'card selected') {
			state.className = 'card not-matched';
		}
		return state;		
	},
}

export default cardFunctions;