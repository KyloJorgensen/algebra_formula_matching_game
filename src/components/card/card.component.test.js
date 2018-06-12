import React from 'react';
import { shallow, mount } from 'enzyme';
import { ClickOutsideContext } from '../click-outside/click-outside.context.js';
import ClickOutside from '../click-outside/click-outside.component.js';
import Card from './card.component.js';

describe('Card', () => {
	let defaultProps;
	let props;
	beforeEach(() => {
		defaultProps = {
			updateMatched: jest.fn().mockImplementation(),
			checkMatch: jest.fn().mockImplementation(),
			addClickOutsideEventListener: jest.fn().mockImplementation(),
			removeClickOutsideEventListener: jest.fn().mockImplementation(),
		};
	});


	describe('Render Card', () => {
		it('should match the snapshot', () => {
			const wrapper = shallow(<Card {...defaultProps} />);
			expect(wrapper).toMatchSnapshot();
		});

		it('should throw error for updateMatched', () => {
			expect(Card.defaultProps.updateMatched).toThrow('Error: no updateMatched prop given');
		});

		it('should throw error for checkMatch', () => {
			expect(Card.defaultProps.checkMatch).toThrow('Error: no checkMatch prop given');
		});

		it('should throw error for addClickOutsideEventListener', () => {
			expect(Card.defaultProps.addClickOutsideEventListener).toThrow('Error: no addClickOutsideEventListener prop given');
		});

		it('should throw error for removeClickOutsideEventListener', () => {
			expect(Card.defaultProps.removeClickOutsideEventListener).toThrow('Error: no removeClickOutsideEventListener prop given');
		});
	});


	describe('interaction', () => {
		beforeEach(() => {
			props = defaultProps;
		});

		it('handleClick should ', () => {
			props.handleClick = jest.fn().mockImplementation();
			const wrapper = shallow(<Card {...props} />);
			wrapper.find('li').simulate('click');
			const mockCallLength = props.handleClick.mock.calls.length;
			expect(mockCallLength).toEqual(1);
		});

		it('checkMatch should ', () => {
			props.checkMatch = jest.fn().mockImplementation();
			const wrapper = shallow(<Card {...props} />);
			wrapper.find('li').simulate('click');
			const mockCallLength = props.checkMatch.mock.calls.length;
			expect(mockCallLength).toEqual(1);
		});

		it('checkMatchResult should ', () => {
			props.checkMatch = (value, match, matchCheckResult) => {
				matchCheckResult(true);
			};
			props.checkMatchResult = jest.fn().mockImplementation();
			const wrapper = shallow(<Card {...props} />);
			wrapper.find('li').simulate('click');
			const mockCallLength = props.checkMatchResult.mock.calls.length;
			expect(mockCallLength).toEqual(1);
		});

		it('handleClickOutside should ', () => {
			props.handleClickOutside = jest.fn().mockImplementation();
			props.value = 'vaule1';
			props.match = 'match1';
			const wrapper = mount(
				<ClickOutside>
					<b></b>
					<ul>
						<ClickOutsideContext.Consumer key={props.value}>
							{context => {
								props.addClickOutsideEventListener = context.addClickOutsideEventListener;
								props.removeClickOutsideEventListener = context.removeClickOutsideEventListener;
								return (
									<Card {...props} />
								);
							}}
						</ClickOutsideContext.Consumer>
					</ul>
				</ClickOutside>
			);
			wrapper.find('ul').simulate('click');
			const mockCallLength = props.handleClickOutside.mock.calls.length;
			expect(mockCallLength).toEqual(1);
		});

		it('handleClickOutside should not unselect selected card ', () => {
			const props = {
				value: 'vaule1',
				match: 'match1',
				checkMatch: () => {}

			};
			const card = {
			}
			const wrapper = mount(
				<ClickOutside>
					<b></b>
					<ul>
						<ClickOutsideContext.Consumer key={card.value}>
							{context => {
								props.addClickOutsideEventListener = context.addClickOutsideEventListener;
								props.removeClickOutsideEventListener = context.removeClickOutsideEventListener;
								return (
									<Card {...props} />
								);
							}}
						</ClickOutsideContext.Consumer>
					</ul>
				</ClickOutside>
			);
			wrapper.find('li').simulate('click');
			wrapper.find('ul').simulate('click');

			expect(wrapper.find('li.selected').length).toEqual(1);
		});

		it('click same card twice should not unselect selected card', () => {
			const props = {
				value: 'vaule1',
				match: 'match1',
				checkMatch: () => {}

			};
			const card = {
			}
			const wrapper = mount(
				<ClickOutside>
					<b></b>
					<ul>
						<ClickOutsideContext.Consumer key={card.value}>
							{context => {
								props.addClickOutsideEventListener = context.addClickOutsideEventListener;
								props.removeClickOutsideEventListener = context.removeClickOutsideEventListener;
								return (
									<Card {...props} />
								);
							}}
						</ClickOutsideContext.Consumer>
					</ul>
				</ClickOutside>
			);
			wrapper.find('li.card').simulate('click');
			wrapper.find('li.selected').simulate('click');

			expect(wrapper.find('li.selected').length).toEqual(1);
		});
	});

	describe('before unmount', () => {
		it('should run removeClickOutsideEventListener', () => {
			props.removeClickOutsideEventListener = jest.fn().mockImplementation();
			const wrapper = shallow(<Card {...props} />);
			wrapper.unmount();
			const mockCallLength = props.removeClickOutsideEventListener.mock.calls.length;
			expect(mockCallLength).toEqual(1);
		});
	});
});