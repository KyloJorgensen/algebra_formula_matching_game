'use strict';

import React from 'react';

const appFunctions = {
  newMatches: (_state, possibleMatches, count, updateMatched) => {
    let cards = [];

    const randomMatches = possibleMatches.sort(() => .5 - Math.random()).slice(0, count).forEach(( pair, index ) => {
      const value = pair.value;
      const match = pair.match;

      cards.push({
        value: value,
        match: match,
        matched: false,
        updateMatched: (matched, index) => updateMatched(matched, index)
      });
      cards.push({value: match,
        match: value,
        matched: false,
        updateMatched: (matched, index) => updateMatched(matched, index)
      });
    });
    
    _state.cards = cards.sort(() => .5 - Math.random());
    _state.clearMatch();
    return(_state);
  },
  onChange: (_state, matches) => {
    _state.matches = matches;
    return(_state);
  },
}

export default appFunctions;


