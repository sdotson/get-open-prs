const assert = require('chai').assert;

const buildGithubPrsLink = require('../../src/buildGithubPrsLink');

describe('buildGithubPrsLink', () => {
  it('should work properly with no owners passed in', () => {
    const team = ['awesomo', 'jesuschrist', 'dumbo', 'goofy', 'somebody'];
    const actual = buildGithubPrsLink(team);
    const expected = 'https://github.com/search?q=is%3Aopen+is%3Apr+author%3Aawesomo+author%3Ajesuschrist+author%3Adumbo+author%3Agoofy+author%3Asomebody';

    assert.deepEqual(expected, actual);
  });
  it('should work properly no owners passed in', () => {
    const team = ['awesomo', 'jesuschrist', 'dumbo', 'goofy', 'somebody'];
    const owners = ['AwesomeCorp']
    const actual = buildGithubPrsLink(team, owners);
    const expected = 'https://github.com/search?q=is%3Aopen+is%3Apr+org%3AAwesomeCorp+author%3Aawesomo+author%3Ajesuschrist+author%3Adumbo+author%3Agoofy+author%3Asomebody';

    assert.deepEqual(expected, actual);
  });
});
