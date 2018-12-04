const assert = require('chai').assert;
const sinon = require('sinon');

const output = require('../../src/output');
const openPrsFixture = require('../fixtures/pullRequests.json');

describe('output.generateSummary()', () => {
  beforeEach(() => {
    sinon.useFakeTimers(new Date(2018, 12, 15).getTime());
  });

  it('should work properly', () => {
    const users = ['awesomo', 'jesuschrist', 'dumbo', 'goofy', 'somebody'];
    const userCounts = {
      awesomo: 4,
      dumbo: 1,
      goofy: 3,
      jesuschrist: 1,
      somebody: 0,
    };
    const actual = output.generateSummary({ userCounts, users });
    const expected = [
      '\u001b[32mSummary\u001b[39m',
      'awesomo: 4 open prs',
      'jesuschrist: 1 open prs',
      'dumbo: 1 open prs',
      'goofy: 3 open prs',
      'somebody: 0 open prs',
      '-----',
    ];

    assert.deepEqual(expected, actual);
  });
});

describe('output.generatePrsList()', () => {
  it('should work properly', () => {
    const actual = output.generatePrsList(openPrsFixture);
    const expected = [
      '\u001b[32madd graceful shutdown and xray (0 comments)\u001b[39m',
      'https://github.com/fakeOrg/jimi-hendrix-experience-service/pull/95',
      'Created by awesomo 7 months ago',
      'Updated 7 months ago',
      '-----',
      '\u001b[32mRemove when we update the confirmationEmailAddress (0 comments)\u001b[39m',
      'https://github.com/fakeOrg/jimi-hendrix-worker/pull/43',
      'Created by awesomo 5 months ago',
      'Updated 3 months ago',
      '-----',
      '\u001b[32mAdd by tripId endpoint (0 comments)\u001b[39m',
      'https://github.com/fakeOrg/awesome-service/pull/7',
      'Created by awesomo 3 months ago',
      'Updated 3 months ago',
      '-----',
      '\u001b[32mAdd ability to view a trip via tripId (0 comments)\u001b[39m',
      'https://github.com/fakeOrg/best-service/pull/95',
      'Created by awesomo 3 months ago',
      'Updated 3 months ago',
      '-----',
      '\u001b[32mCOR-28059: Add v3 rooms integration tests (0 comments)\u001b[39m',
      'https://github.com/fakeOrg/god-service/pull/139',
      'Created by jesuschrist a month ago',
      'Updated a month ago',
      '-----',
      '\u001b[32mUpdate room-matching-py lib to version 1.2.0 (0 comments)\u001b[39m',
      'https://github.com/fakeOrg/db-hotel-properties/pull/37',
      'Created by dumbo a month ago',
      'Updated a month ago',
      '-----',
      '\u001b[32mAdd settle effect combinator (27 comments)\u001b[39m',
      'https://github.com/redux-saga/redux-saga/pull/759',
      'Created by goofy 2 years ago',
      'Updated a year ago',
      '-----',
      '\u001b[32mci testing  (0 comments)\u001b[39m',
      'https://github.com/goofy/finances-react/pull/1',
      'Created by goofy a year ago',
      'Updated a year ago',
      '-----',
      '\u001b[32mUse ~ for node engine version (0 comments)\u001b[39m',
      'https://github.com/fakeOrg/service-experience-service/pull/478',
      'Created by goofy a month ago',
      'Updated a month ago',
      '-----',
    ];

    assert.deepEqual(expected, actual);
  });
});
