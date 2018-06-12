import ClickOutsideFunctions from './click-outside.functions.js';
import op from 'object-path';

describe('addClickOutsideEventListener function', () => {
  let state;
  describe('uniqueTag exist ', () => {
    beforeEach(() => {
      state = {
        clickOutsideEventListeners: op({
          'uniqueTag': () => {},
          'uniqueTagOther': () => {},
        }),
      };
    });

    it('_state should contain uniqueTag', () => {
      const result = ClickOutsideFunctions.addClickOutsideEventListener(state, 'uniqueTag', () => {});
      expect(result._state.clickOutsideEventListeners.has('uniqueTag')).toEqual(true);
    });

    it('added should be false', () => {
      const result = ClickOutsideFunctions.addClickOutsideEventListener(state, 'uniqueTag', () => {});
      expect(result.added).toEqual(false);
    });
  });
  
  describe('uniqueTag dosen\'t exist ', () => {
    beforeEach(() => {
      state = {
        clickOutsideEventListeners: op({
          'uniqueTagOther': () => {},
        }),
      };
    });
    it('_state should contain uniqueTag', () => {
      const result = ClickOutsideFunctions.addClickOutsideEventListener(state, 'uniqueTag', () => {});
      expect(result._state.clickOutsideEventListeners.has('uniqueTag')).toEqual(true);
    });

    it('added should be true', () => {
      const result = ClickOutsideFunctions.addClickOutsideEventListener(state, 'uniqueTag', () => {});
      expect(result.added).toEqual(true);
    });
  });
});

describe('removeClickOutsideEventListener function', () => {
  let state;
  describe('uniqueTag exist ', () => {
    beforeEach(() => {
      state = {
        clickOutsideEventListeners: op({
          'uniqueTag': () => {},
          'uniqueTagOther': () => {},
        }),
      };
    });

    it('_state should not contain uniqueTag', () => {
      const result = ClickOutsideFunctions.removeClickOutsideEventListener(state, 'uniqueTag');
      expect(result._state.clickOutsideEventListeners.has('uniqueTag')).toEqual(false);
    });

    it('deleted should be true', () => {
      const result = ClickOutsideFunctions.removeClickOutsideEventListener(state, 'uniqueTag');
      expect(result.deleted).toEqual(true);
    });
  });

  describe('uniqueTag dosen\'t exist ', () => {
    beforeEach(() => {
      state = {
        clickOutsideEventListeners: op({
          'uniqueTagOther': () => {},
        }),
      };
    });

    it('_state should not contain uniqueTag', () => {
      const result = ClickOutsideFunctions.removeClickOutsideEventListener(state, 'uniqueTag');
      expect(result._state.clickOutsideEventListeners.has('uniqueTag')).toEqual(false);
    });

    it('deleted should be false', () => {
      const result = ClickOutsideFunctions.removeClickOutsideEventListener(state, 'uniqueTag');
      expect(result.deleted).toEqual(false);
    });
  });
});