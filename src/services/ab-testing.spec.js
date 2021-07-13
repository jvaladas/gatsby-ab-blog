import {
  trackPageview,
  trackEvent,
  ABTest,
} from './ab-testing'

const createBaseElement = () => {
  const el = document.implementation.createHTMLDocument();
  el.body.innerHTML = `
    <ab-control test-id="1">
      <div>control content</div>
    </ab-control>
    <ab-alternative test-id="1">
      <div>alternative content</div>
    </ab-alternative>`;
  return el;
}

describe('ABTestingService', () => {
  const initialURL = '/page-url/blog-1';
  const initialState = [{
    url: initialURL,
    tests: [],
    events: [
      {
        name: 'Sign Up',
      }
    ],
  }];

  beforeEach(() => {
    localStorage.setItem('ab-testing', JSON.stringify(initialState));
  });

  afterEach(() => {
    localStorage.removeItem('ab-testing');
  })

  describe('trackPageview', () => {
    describe('when page url is not in storage', () => {
      it('adds page url to storage', () => {
        const url = 'page-3';
        const expected = [
          ...initialState,
          {
            url,
            events: [],
            tests: [],
          }];
        trackPageview(url);

        expect(JSON.parse(localStorage.getItem('ab-testing')))
          .toMatchObject(expected);
      });
    });
    describe('when page url is in storage', () => {
      it('does nothing', () => {
        trackPageview(initialURL);

        expect(JSON.parse(localStorage.getItem('ab-testing')))
        .toMatchObject(initialState);
      })
    });
  });

  describe('trackEvent', () => {
    describe('when page event is not on storage', () => {
      it('adds page event to storage', () => {
        const expected = [{
          url: initialURL,
          tests: [],
          events: [
            { name: 'Sign Up' },
            { name: 'Climb' },
          ],
        }];

        trackEvent(initialURL, 'Climb');

        expect(JSON.parse(localStorage.getItem('ab-testing')))
        .toMatchObject(expected);
      });
    })
    describe('when page event is on storage', () => {
      it('does nothing', () => {
        trackEvent(initialURL, 'Sign Up');

        expect(JSON.parse(localStorage.getItem('ab-testing')))
        .toMatchObject(initialState);
      });
    })
  });

  describe('ABTest', () => {
    const initialURL = '/page-url/blog-1';

    describe('when test result is control', () => {
      beforeEach(() => {
        const initialState = [{
          url: initialURL,
          tests: [
            {
              id: '1',
              result: 'control',
            },
          ],
          events: [],
        }];
        localStorage.setItem('ab-testing', JSON.stringify(initialState));
      });

      afterEach(() => {
        localStorage.removeItem('ab-testing');
      });

      it('hides the alternative tag from the base element', () => {
        const base = createBaseElement();
        const control = base.querySelector('ab-control');
        const alternative = base.querySelector('ab-alternative');

        ABTest(initialURL, base, control);
        expect(alternative.classList.contains('hidden')).toBe(true)
      });
    });

    describe('when test result is alternative', () => {
      beforeEach(() => {
        const initialState = [{
          url: initialURL,
          tests: [
            {
              id: '1',
              result: 'alternative',
            },
          ],
          events: [],
        }];
        localStorage.setItem('ab-testing', JSON.stringify(initialState));
      });

      afterEach(() => {
        localStorage.removeItem('ab-testing');
      });

      it('hides the control tag from the base element', () => {
        const base = createBaseElement();
        const control = base.querySelector('ab-control');

        ABTest(initialURL, base, control);
        expect(control.classList.contains('hidden')).toBe(true)
      });
    });
  });
});
