'use strict';

import React, { Component } from 'react';
import ClickOutside from './click-outside/click-outside.component.js';
import possibleMatches from './possiblematches/possiblematches.js';
import Header from './header/header.component.js';
import Match from './match/match.component.js';
import Card from './card/card.component.js';
import AppFunctions from './app.functions.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      matches: 12,
      newGame: false,
      clearMatch: () => {},
    };
    
    this.newGame = event => {
      this.setState(AppFunctions.newMatches(this.state, this.props.possibleMatches, this.state.matches, this.updatedMachted));
    };

    this.updatedMachted = (matched, index) => {
      const _state = this.state;
      _state.cards[index].matched = matched;
      this.setState(_state);
    }

    this.onChange = event => {
      this.setState(AppFunctions.onChange(this.state, event.target.value));
    };

    this.clearMatch = clearMatch => {
      const _state = this.state;
      _state.clearMatch = clearMatch;
      this.setState(_state);
    }
  }

  render() {
    const { newGame, onChange, clearGame, clearMatch} = this;
    const { cards, matches } = this.state;
    return (
      <ClickOutside>
        <div>
          <Header newGame={newGame} onChange={onChange} matches={matches} />
          <Match cards={cards} newGame={newGame} clearMatch={clearMatch}/>
        </div>
      </ClickOutside>
    );
  }
}
App.defaultProps = {
  possibleMatches: possibleMatches,
};

export default App;