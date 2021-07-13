import { shortenString } from './string-formatter';

describe('shortenString', () => {
  describe('when string is shorter than limit', () => {
    it('returns original string', () => {
      const input = '123456789';
      const result = shortenString(input, 11);

      expect(result).toBe(input);
    })
  });

  describe('when string is longer than limit', () => {
    it('returns shorter string', () => {
      const input = '123456789';
      const expected = '12345...';
      const result = shortenString(input, 5);

      expect(result).toBe(expected);
    })
  })
});
