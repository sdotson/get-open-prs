const assert = require('chai').assert;

const getPrCountsByUser = require('../../src/getPrCountsByUser');
const openPrsFixture = require('../fixtures/pullRequests.json');

describe('getPrCountsByUser', () => {
  it('should work properly', () => {
    const team = ['awesomo', 'jesuschrist', 'dumbo', 'goofy', 'somebody'];
    const actual = getPrCountsByUser(team, openPrsFixture);
    const expected = {
      awesomo: 4,
      dumbo: 1,
      goofy: 3,
      jesuschrist: 1,
      somebody: 0,
    };

    assert.deepEqual(expected, actual);
  });
});
