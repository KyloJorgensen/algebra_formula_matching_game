'use strict';

import React, { Component } from 'react';
import './header.less';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

	render() {
		const { newGame, onChange, matches } = this.props;
		return (
			<header>
				<h1>Algebra Formula Matching Game</h1>
				<div className="total-matches-wrapper" >
					<div>
						<label htmlFor="total-matches">Total Matches</label>
						<input id="total-matches" type="number" onChange={onChange} value={matches} />
					</div>
				</div>
				<button className="new-game" onClick={newGame} >New Game</button>
			</header>
		);
	}
}

Header.defaultProps = {
	newGame: () => {},
	onChange: () => {},
	matches: 12,
};


export default Header;