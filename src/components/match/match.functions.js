'use strict';

const matchFunctions = {
    checkMatch: (_state, value, match, callback) => {
        if (_state.match !== null) {
            if (_state.match.value === match && _state.match.match === value) {
                _state.match.callback(true);
                callback(true);
            } else {
                _state.match.callback(false);
                callback(false);
            }
            _state.match = null;
        } else {
            _state.match = {
                value: value, 
                match: match, 
                callback: callback
            };
        }
        return _state;
    }
}

export default matchFunctions;


