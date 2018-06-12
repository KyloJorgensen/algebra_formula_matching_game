import React from 'react';
import { shallow, mount } from 'enzyme';
import App from './app.js';

describe('Render App', () => {
	it('matches the snapshot', () => {
		const wrapper = shallow(<App />);
		expect(wrapper).toMatchSnapshot();
	});
});

describe('App functionality', () => {
});

describe('Interaction', () => {
	describe('New Game', () => {
		it('should have no match cards', () => {
			const possibleMatches = [
				{
					value: 'value1',
					match: 'match1',
				}
			];
			const wrapper = mount(<App possibleMatches={possibleMatches} />)
			wrapper.find('li.card').first().simulate('click');
			wrapper.find('li.card').last().simulate('click');
			wrapper.find('button.new-game').simulate('click');
			expect(wrapper.find('li.matched').length).toEqual(0);
		});
		it('should have no matches selected', () => {
			const possibleMatches = [
				{
					value: 'value1',
					match: 'match1',
				},
				{
					value: 'value2',
					match: 'match2',
				},
				{
					value: 'value3',
					match: 'match3',
				},
			];
			const wrapper = mount(<App possibleMatches={possibleMatches} />)
			wrapper.find('li.card').first().simulate('click');
			wrapper.find('button.new-game').simulate('click');
			wrapper.find('li.card').last().simulate('click');
			expect(wrapper.find('li.not-matched').length).toEqual(0);
		});
	});
	describe('number of pairs', () => {
		it('should start at 12 pairs', () => {
			const wrapper = mount(<App></App>);
			expect(wrapper.find('li.card').length).toEqual(24);
		});

		it('should have 20 pairs', () => {
			const wrapper = mount(<App></App>);
			wrapper.find('input#total-matches').simulate('change', { target: { value: 20 } });
			wrapper.find('button.new-game').simulate('click');
			expect(wrapper.find('li.card').length).toEqual(40);
		});


		it('should have one less pair with -1 matches', () => {
			const possibleMatches = [
				{
					value: 'value1',
					match: 'match1',
				},
				{
					value: 'value2',
					match: 'match2',
				},
				{
					value: 'value3',
					match: 'match3',
				},
			];
			const wrapper = mount(<App possibleMatches={possibleMatches} ></App>);
			wrapper.find('input#total-matches').simulate('change', { target: { value: -1 } });
			wrapper.find('button.new-game').simulate('click');
			expect(wrapper.find('li.card').length).toEqual(4);
		});
	});
});