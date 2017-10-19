const mock = require('mock-require');
const expect = require('chai').expect;
const { mockGithub } = require('../helpers/mockHelpers');
const fixtures = require('../fixtures/pullRequests');

let getPrs = require('../../getPrs');
mockGithub(fixtures.allPrOneStranger);
getPrs = mock.reRequire('../../getPrs');

describe('getPrs', () => {
  it('should only return prs from team members', () => {
    const team = ['person1', 'person2'];
    return getPrs(team).then((prsData) => {
      expect(prsData.prs.length).to.equal(3);
    });
  });
  it('should accurately sum open prs', () => {
    const team = ['person1', 'person2'];
    return getPrs(team).then((prsData) => {
      expect(prsData.userCounts.person1).to.equal(1);
      expect(prsData.userCounts.person2).to.equal(2);
    });
  });
});
