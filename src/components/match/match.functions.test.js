import MatchFunctions from './match.functions.js';

const testMatches = true;

describe('Match functions', () => {
  describe('checkMatch function', () => {
	describe('function ran with no match', () => {
		const _state = {
			match: null,
		};
		const value = 'value1';
		const match = 'match1';
		const mockCallback = jest.fn().mockImplementation();
		const postState = MatchFunctions.checkMatch(_state, value, match, mockCallback);

		it('postState.match should be an object', () => {
			expect(typeof postState.match).toEqual('object');
		});	

		it('postState.match.value should be equal to value1', () => {
			expect(postState.match.value).toEqual('value1');
		});

		it('postState.match.match should be equal to match1', () => {
			expect(postState.match.match).toEqual('match1');
		});

		it('mockCallback not called', () => {
			const mockCallLength = mockCallback.mock.calls.length;
			expect(mockCallLength).toEqual(0);
		});
	});

	describe('function ran with match that matches', () => {
		const mockCallback1 = jest.fn().mockImplementation();

		const _state = {
			match: {
				value: 'value1',
				match: 'match1',
				callback: mockCallback1
			},
		};

		const value = 'match1';
		const match = 'value1';
		const mockCallback2 = jest.fn().mockImplementation();
		const postState = MatchFunctions.checkMatch(_state, value, match, mockCallback2);

		it('postState.match should be null', () => {
			expect(postState.match).toBeNull();
		});	

		it('mockCallback1 called once', () => {
			const mockCall1Length = mockCallback1.mock.calls.length;
			expect(mockCall1Length).toEqual(1);
		});	
		it('mockCallback1 to return true', () => {
			const mockCall1Result = mockCallback1.mock.calls[0][0];
			expect(mockCall1Result).toEqual(true);
		});

		it('mockCallback2 called once', () => {
			const mockCall2Length = mockCallback2.mock.calls.length;
			expect(mockCall2Length).toEqual(1);
		});

		it('mockCallback2 to return true', () => {
			const mockCall2Result = mockCallback2.mock.calls[0][0];
			expect(mockCall2Result).toEqual(true);
		});
	});

	describe('function ran with match that dosen\'t matches', () => {
		const mockCallback1 = jest.fn().mockImplementation();

		const _state = {
			match: {
				value: 'value1',
				match: 'match1',
				callback: mockCallback1
			},
		};

		const value = 'match2';
		const match = 'value2';
		const mockCallback2 = jest.fn().mockImplementation();
		const postState = MatchFunctions.checkMatch(_state, value, match, mockCallback2);

		it('postState.match should be null', () => {
			expect(postState.match).toBeNull();
		});	

		it('mockCallback1 called once', () => {
			const mockCall1Length = mockCallback1.mock.calls.length;
			expect(mockCall1Length).toEqual(1);
		});	
		it('mockCallback1 to return false', () => {
			const mockCall1Result = mockCallback1.mock.calls[0][0];
			expect(mockCall1Result).toEqual(false);
		});

		it('mockCallback2 called once', () => {
			const mockCall2Length = mockCallback2.mock.calls.length;
			expect(mockCall2Length).toEqual(1);
		});

		it('mockCallback2 to return false', () => {
			const mockCall2Result = mockCallback2.mock.calls[0][0];
			expect(mockCall2Result).toEqual(false);
		});
	});
  });
});