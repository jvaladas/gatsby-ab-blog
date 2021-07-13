import { parseHTML } from './html-parser';

describe('parseHTML', () => {
  it('turns html-like string into Document', () => {
    const input = "<div><p>AAAA</p></div>";
    const result = parseHTML(input);

    expect(result.body.innerHTML).toBe(input);
  });
});
