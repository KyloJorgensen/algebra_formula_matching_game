import possibleMatches from './possiblematches.js';

describe('Test the possibleMatches', () => {
	it('matches the snapshot', () => {
		expect(possibleMatches).toMatchSnapshot();
	});
	it('should be an object', () => {
		expect(typeof possibleMatches).toEqual('object');
	});
});

describe('each possible pair', () => {
	it('pair should be an object' , () => {
		possibleMatches.forEach(match => {
			expect(typeof match).toEqual('object');
		});
	});
	it('value should be a string' , () => {
		possibleMatches.forEach(match => {
			expect(typeof match.value).toEqual('string');
		});
	});
	it('match should be a string' , () => {
		possibleMatches.forEach(match => {
			expect(typeof match.match).toEqual('string');
		});
	});
});