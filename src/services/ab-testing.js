/**
 * AB Testing Storage structure example:
 * [
 *  {
 *    url: 'exampleurl.com',
 *    tests: [
 *        {
 *            id: '12',
 *            result: 'control',
 *        },
 *        {
 *            id: '52',
 *            result: 'alternative',
 *        },
 *    ],
 *    events: [
 *        {
 *            name: 'sign-up',
 *        },
 *        {
 *          name: 'swim',
 *        },
 *    ],
 *  },
 * ]
 * */

const saveABTestingStorage = (data) => (
  localStorage.setItem('ab-testing', JSON.stringify(data))
)

const getABTestingStorage = () => {
  let data = localStorage.getItem('ab-testing');
  if (!data) {
    const obj = [];
    saveABTestingStorage(obj);
    return obj
  }

  return JSON.parse(data);
};

const saveABTestResult = (url, testId, result) => {
  const data = getABTestingStorage();
  const page = data.find((_) => _.url === url);

  page.tests.push({
    id: testId,
    result,
  });

  saveABTestingStorage(data);
};

const runABTest = () => {
  const r = Math.random() * 100;
  return r < 50 ? 'control' : 'alternative';
};

/**
 * If there's no previous result will run a new test.
 * Else returns previous test result
 * @param {*} url
 * @param {*} testId
 * @returns test result
 */
const getABTestResult = (url, testId) => {
  const data = getABTestingStorage();
  const page = data.find((_) => _.url === url);
  const prevResult = page.tests.find((_) => _.id === testId)?.result;

  if (!prevResult) {
    const result = runABTest();
    saveABTestResult(url, testId, result);
    return result;
  }

  return prevResult;
};

/**
 * Checks if a url page entry already exists in the storage,
 * if not will add a new page and print Pageview info.
 * @param {A} url
 */
export const trackPageview = (url) => {
  const data = getABTestingStorage();
  const page  = data.find((_) => _.url === url);
  if (!page) {
    data.push({
      url,
      tests: [],
      events: [],
    });

    saveABTestingStorage(data);
    console.log(`--> Pageview URL: ${url}`);
  }
};

export const trackEvent = (url, name) => {
  const data = getABTestingStorage();
  const page = data.find((_) => _.url === url);
  const event = page.events.find((_) => _.name === name);

  if (!event) {
    page.events.push({ name });
    saveABTestingStorage(data);
    console.log(`--> Event: ${name}`);
  }
}

/**
 * Checks the AB test results for the test-id of the given control element
 * and removes the opposite element of the test result.
 * (ex.: 'control' result removes ab-alternative)
 * If there are previous results, will remove elements according
 * to the previous test.
 *
 * Note: we get the control element as param so we don't need
 * to look it up if we need to hide it.
 * @param {*} url
 * @param {*} baseElement
 * @param {*} control
 */
export const ABTest = (url, baseElement, control) => {
  const testId = control.getAttribute('test-id');

  let result = getABTestResult(url, testId);
  if (result === 'control') {
    const alternative = baseElement.querySelector(`ab-alternative[test-id='${testId}']`);
    alternative?.classList.add('hidden');
  } else if (result === 'alternative') {
    control.classList.add('hidden');
  }
};
