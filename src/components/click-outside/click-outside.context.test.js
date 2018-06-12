import React, { Component } from 'react';
import { shallow, mount } from 'enzyme';
import { ClickOutsideContext } from '../click-outside/click-outside.context.js';

describe('Render ClickOutsideContext.Consumer', () => {
	class ComponentDidMount extends Component { 
		constructor(props) {
			super(props);
		}

		componentDidMount() {
			this.props.addClickOutsideEventListener('uniqueTag', this.props.mockFunction);
		}

		componentWillUnmount() {
			this.props.removeClickOutsideEventListener('uniqueTag');
		}

		render () {
			return (<button></button>)
		}
	}
	ComponentDidMount.defaultProps = {
		addClickOutsideEventListener: () => {},
		mockFunction: () => {},
	};

	class UnmountButton extends Component { 
		constructor(props) {
			super(props);
			this.state = {
				mount: true,
			};
			this.handleClick = event => {
				const _state = this.state;
				_state.mount = false;
				this.setState(_state);
			};
		}

		render () {
			return (
				<div>
					<button className="unmount-button" onClick={this.handleClick}></button>
					{this.state.mount ? this.props.children : ''}
				</div>
			);
		}
	}

	let wrapper;

	it('should match the snapshot', () => {
		let props = {};
		wrapper = mount(
			<div>
				<ClickOutsideContext.Consumer>
					{context => {
						props.addClickOutsideEventListener = context.addClickOutsideEventListener;
						props.removeClickOutsideEventListener = context.removeClickOutsideEventListener;
						return (
							<div><p></p></div>
						);
					}}
				</ClickOutsideContext.Consumer>
			</div>
		);
		expect(wrapper).toMatchSnapshot();
	});



	describe('if no ClickOutsideContext.Provider', () => {
		describe('addClickOutsideEventListener', () => {
			it('should thorw error', () => {
				let props = {}
				wrapper = mount(
					<div>
						<ClickOutsideContext.Consumer>
							{context => {
								props = {
									addClickOutsideEventListener: context.addClickOutsideEventListener,
								}
								return '';
							}}
						</ClickOutsideContext.Consumer>
					</div>
				);

				expect(props.addClickOutsideEventListener).toThrow('Error: Cannot addClickOutsideEventListener no ClickOutsideContext.Provider element in parents');
			});
		});

		describe('removeClickOutsideEventListener', () => {
			it('should thorw error', () => {
				let props = {}
				wrapper = mount(
					<div>
						<ClickOutsideContext.Consumer>
							{context => {
								props = {
									removeClickOutsideEventListener: context.removeClickOutsideEventListener,
								}
								return '';
							}}
						</ClickOutsideContext.Consumer>
					</div>
				);

				expect(props.removeClickOutsideEventListener).toThrow('Error: Cannot removeClickOutsideEventListener no ClickOutsideContext.Provider element in parents');
			});
		});
	});
});


