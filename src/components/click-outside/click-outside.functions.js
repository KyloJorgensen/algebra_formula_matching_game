'use strict';

const removeAllPeriods = (str) => str.split('.').join('');

const clickOutsideFunctions = {

	addClickOutsideEventListener: (_state, uniqueTag, clickHandler) => {
		let added = true;
		if (_state.clickOutsideEventListeners.get(removeAllPeriods(uniqueTag))) {
			added = false;
		}
		_state.clickOutsideEventListeners.set(removeAllPeriods(uniqueTag), clickHandler);
		return {_state: _state, added: added};
	},
	removeClickOutsideEventListener: (_state, uniqueTag) => {
		let deleted = true;
		if (!_state.clickOutsideEventListeners.has(removeAllPeriods(uniqueTag))) {
			deleted = false;
		} else {
			_state.clickOutsideEventListeners.del(removeAllPeriods(uniqueTag));
		}
		return {_state: _state, deleted: deleted};
	}
};

export default clickOutsideFunctions;