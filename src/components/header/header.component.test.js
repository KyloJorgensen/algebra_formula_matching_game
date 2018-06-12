import React from 'react';
import { shallow } from 'enzyme';
import Header from './header.component.js';

describe('Render Header', () => {
	let wrapper;
	beforeEach(() => {
		wrapper = shallow(<Header />);
	});

	it('should match the snapshot', () => {
		expect(wrapper).toMatchSnapshot();
	});

	it('should have a button', () => {
		let button = wrapper.find('button');
		expect(button).toHaveProperty('length', 1);
	});

	it('should have a input', () => {
		let input = wrapper.find('input');
		expect(input).toHaveProperty('length', 1);
	});

	it('should have newGame as a default function that is returns nothing', () => {
		expect(Header.defaultProps.newGame()).toBeUndefined();
	});

	it('should have onChange as a default function that is returns nothing', () => {
		expect(Header.defaultProps.onChange()).toBeUndefined();
	});
});

describe('interaction', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			newGame: () => 1,
			onChange: () => 1,
			matches: 12,
		};
	});
	describe('New Game Button', () => {
		beforeEach(() => {
			props.newGame = jest.fn().mockImplementation();
			wrapper = shallow(<Header {...props} />)
		});
		describe('new Game button', () => {
			let button;
			beforeEach(() => {
				button = wrapper.find('button');
				button.simulate('click');
			})
			it('when button is click run function', () => {
				const mockCallLength = props.newGame.mock.calls.length;
				expect(mockCallLength).toEqual(1);
			});
		});
	});
	describe('Total Matches Input', () => {
		beforeEach(() => {
			props.onChange = jest.fn().mockImplementation();
			props.matches = 23;
			wrapper = shallow(<Header {...props} />)
		});

		it('should be 23', () => {
			const input = wrapper.find('input')
			const matches = input.props().value
			expect(matches).toEqual(23);
		});

		it('onChange should be called on change', () => {
			const input = wrapper.find('input');
			input.simulate('change', { target: { value: 17 } });
			const mockCallLength = props.onChange.mock.calls.length;
			expect(mockCallLength).toEqual(1);
		});

		it('value should be chagned to 17', () => {
			const input = wrapper.find('input');
			input.simulate('change', { target: { value: 17 } });
			const mockCallResult = props.onChange.mock.calls[0][0];
			expect(mockCallResult.target.value).toEqual(17);
		});


	});
});
