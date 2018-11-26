const mock = require('mock-require');
const expect = require('chai').expect;
const { mockGithub } = require('../helpers/mockHelpers');
const fixtures = require('../fixtures/pullRequests');

describe('getPrs', () => {
  // todo make real
  it('should only return prs from team members', () => {
    expect(true).to.equal(true);
  });
});
