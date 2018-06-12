import CardFunctions from './card.functions.js';

describe('checkMatchResult function', () => {
  let state;
  let props;
  describe('result is true ', () => {
    beforeEach(() => {
      state = {
        className: "card",
      };
      props = {
        matched: false, 
        updateMatched: matched => props.matched = matched,
      };
    });
    it('className should be "card"', () => {
      const result = CardFunctions.checkMatchResult(state, props, true);
      expect(result.className).toEqual("card");
    });
    it('matched should be true', () => {
      const result = CardFunctions.checkMatchResult(state, props, true);
      expect(props.matched).toEqual(true);
    });
  });
  describe('result is false ', () => {
    beforeEach(() => {
      state = {
        className: "card",
      };
      props = {
        matched: false, 
        updateMatched: matched => props.matched = matched,
      };
    });
    it('className should be "card selected"', () => {
      const result = CardFunctions.checkMatchResult(state, props, false);
      expect(result.className).toEqual("card selected");
    });
    it('matched should be false', () => {
      const result = CardFunctions.checkMatchResult(state, props, false);
      expect(props.matched).toEqual(false);
    });
  });
});

describe('handleClickOutside function', () => {
  describe('when outside is false and className is selected', () => {
    let state;
    let props;
    let outside = false;

    beforeEach(() => {
      state = {
        className: "card selected",
      };
      props = {
        matched: false, 
        updateMatched: matched => props.matched = matched,
      };
    });

    it('should be changed to "card not-matched"', () => {
      const result = CardFunctions.handleClickOutside(state, props, outside);
      expect(result.className).toEqual('card not-matched');
    });
  });

  describe('when outside is false and className is not-matched', () => {
    let state;
    let props;
    let outside = false;

    beforeEach(() => {
      state = {
        className: "card not-matched",
      };
      props = {
        matched: false, 
        updateMatched: matched => props.matched = matched,
      };
    });
    
    it('should be changed to "card not-matched"', () => {
      const result = CardFunctions.handleClickOutside(state, props, outside);
      expect(result.className).toEqual('card not-matched');
    });
  });

  describe('when outside is true and className is selected', () => {
    let state;
    let props;
    let outside = true;

    beforeEach(() => {
      state = {
        className: "card selected",
      };
      props = {
        matched: false, 
        updateMatched: matched => props.matched = matched,
      };
    });

    it('should be changed to "card not-matched"', () => {
      const result = CardFunctions.handleClickOutside(state, props, outside);
      expect(result.className).toEqual('card not-matched');
    });
  });

  describe('when outside is true and className is not-matched', () => {
    let state;
    let props;
    let outside = true;

    beforeEach(() => {
      state = {
        className: "card not-matched",
      };
      props = {
        matched: false, 
        updateMatched: matched => props.matched = matched,
      };
    });

    it('should be changed to "card not-matched"', () => {
      const result = CardFunctions.handleClickOutside(state, props, outside);
      expect(result.className).toEqual('card');
    });
  });
});