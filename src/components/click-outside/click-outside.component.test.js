import React, { Component } from 'react';
import { shallow, mount } from 'enzyme';
import { ClickOutsideContext } from './click-outside.context.js';
import ClickOutside from './click-outside.component.js';

describe('Render ClickOutside', () => {
	it('should match the snapshot', () => {
		const wrapper = shallow(<ClickOutside/>);
		expect(wrapper).toMatchSnapshot();
	});
});


describe('interaction', () => {
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

	beforeEach(() => {


	})

	it('child component able to add a clickOutsideListener', () => {
		const mockAddClickOutsideEventListener = jest.fn().mockReturnValue({_state: {'uniqueTag': () => {}}, added: true});;
		wrapper = mount(
			<ClickOutside addClickOutsideEventListener={mockAddClickOutsideEventListener} >
				<div>
					<b></b>
					<ClickOutsideContext.Consumer>
						{context => {
							return (<ComponentDidMount addClickOutsideEventListener={context.addClickOutsideEventListener} />);
						}}
					</ClickOutsideContext.Consumer>
				</div>
			</ClickOutside>
		);

		const mockCallLength = mockAddClickOutsideEventListener.mock.calls.length;
		expect(mockCallLength).toEqual(1);
	});

	it('onClick should run all of the clickOutsideListeners', () => {
		const mockFunction = jest.fn().mockImplementation();
		wrapper = mount(
			<ClickOutside >
				<div>
					<b></b>
					<ClickOutsideContext.Consumer>
						{context => {
							return (<ComponentDidMount mockFunction={mockFunction} addClickOutsideEventListener={context.addClickOutsideEventListener} />);
						}}
					</ClickOutsideContext.Consumer>
				</div>
			</ClickOutside>
		);
		wrapper.find('b').simulate('click');

		const mockCallLength = mockFunction.mock.calls.length;
		expect(mockCallLength).toEqual(1);
	});

	it('child component able to remove a clickOutsideListener', () => {
		const mockFunction = jest.fn().mockImplementation();
		const mockRemoveClickOutsideEventListener = jest.fn().mockImplementation();
		wrapper = mount(
			<ClickOutside >
				<div>
					<b></b>
					<UnmountButton>
						<ClickOutsideContext.Consumer>
							{context => {
								let props = {
									mockFunction: mockFunction,
									addClickOutsideEventListener: context.addClickOutsideEventListener,
									removeClickOutsideEventListener: context.removeClickOutsideEventListener,
								}
								return (<ComponentDidMount {...props} />);
							}}
						</ClickOutsideContext.Consumer>
					</UnmountButton>
				</div>
			</ClickOutside>
		);
		wrapper.find('button.unmount-button').simulate('click');

		let mockCallLength = mockFunction.mock.calls.length;
		expect(mockCallLength).toEqual(1);

		wrapper.find('b').simulate('click');
		mockCallLength = mockFunction.mock.calls.length;
		expect(mockCallLength).toEqual(1);
	});

});