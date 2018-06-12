import React from 'react';
import { shallow, mount } from 'enzyme';
import ClickOutside from '../click-outside/click-outside.component.js';
import Match from './match.component.js';


describe('Render Match', () => {
	let wrapper;
	it('should match the snapshot', () => {
		wrapper = shallow(<Match />);
		expect(wrapper).toMatchSnapshot();
	});
	it('should have two cards', () => {
		let props = {
			cards: [
				{
					value: 'value',
					match: 'match'
				},
				{
					value: 'match',
					match: 'value'
				},
			],
			newGame: () => {}
		}
		wrapper = mount(
			<ClickOutside>
				<Match {...props} />
			</ClickOutside>
		);

		expect(wrapper.find('li.card').length).toEqual(2);
	});
});

describe('matchCheck', () => {
	it('should run matchCheck when a card is click', () => {
		const props = {
			cards: [{value: 'value1', match: 'match1'}],
			newGame: () => {},
			checkMatch: jest.fn().mockImplementation(),
		}
		const wrapper = mount(<ClickOutside><Match {...props} /></ClickOutside>);
		const card = wrapper.find('li.card');
		expect(card.length).toEqual(1)
		card.simulate('click');
		expect(props.checkMatch.mock.calls.length).toEqual(1);
	});
});

describe('interaction', () => {
	describe('should have two pairs', () => {
		let props;
		let wrapper;
		beforeEach(() => {
			props = {
				cards: [
					{
						value: 'value1',
						match: 'match1'
					},
					{
						value: 'match1',
						match: 'value1'
					},
					{
						value: 'value2',
						match: 'match2'
					},
					{
						value: 'match2',
						match: 'value2'
					},
				],
				newGame: () => {},
			};
		});

		it('4 cards', () => {
			wrapper = mount(<ClickOutside><Match {...props} /></ClickOutside>);
			expect(wrapper.find('li.card').length).toEqual(4);
		});

		it('one selected', () => {
			wrapper = mount(<ClickOutside><Match {...props} /></ClickOutside>);
			wrapper.find('li.card').first().simulate('click');
			expect(wrapper.find('li.selected').length).toEqual(1);
		});

		it('two not-match', () => {
			wrapper = mount(<ClickOutside><Match {...props} /></ClickOutside>);
			wrapper.find('li.card').first().simulate('click');
			wrapper.find('li.card').last().simulate('click');
			expect(wrapper.find('li.not-matched').length).toEqual(2);
		});

		it('should not matched when selected card is click twice in a row', () => {
			wrapper = mount(<ClickOutside><Match {...props} /></ClickOutside>);
			wrapper.find('li.card').first().simulate('click');
			wrapper.find('li.card').first().simulate('click');
			expect(wrapper.find('li.not-matched').length).toEqual(0);
		});
	});
});