const assert = require('chai').assert;
const nock = require('nock');


const { getPrs } = require('../../src/services/github');
const openPrsFixture = require('../fixtures/pullRequests.json');

describe('github.getPrs', () => {
  const edgeNodes = openPrsFixture.map((openPr) => {
    return {
      node: openPr
    }
  });
  const graphQLResponse = {
    user: {
      pullRequests: {
        edges: edgeNodes
      }
    }
  };
  
  it('should work properly without ownerFilter', async () => {
    const scope = nock('https://api.github.com', {
        reqheaders: {
          authorization: 'bearer TOKEN',
          'content-type': 'application/json'
        }
      })
      .post('/graphql', "{\"query\":\"\\n    query {\\n      user(login: \\\"awesomo\\\") {\\n        pullRequests(last: 100, states:OPEN) {\\n          edges {\\n            cursor\\n            node {\\n              title\\n              comments {\\n                totalCount\\n              }\\n              body\\n              url\\n              author {\\n                login\\n              }\\n              repository {\\n                owner {\\n                  login\\n                }\\n              }\\n              updatedAt\\n              createdAt\\n            }\\n          }\\n        }\\n      }\\n    }\\n    \"}")
      .reply(200, { data: graphQLResponse })
    const team = ['awesomo'];
    const token = 'TOKEN';
    const ownerFilter = undefined;
    const actual = await getPrs(team, token, ownerFilter);
    const expected = openPrsFixture;

    assert.deepEqual(actual, expected);
    scope.done();
  });
  it('should work properly with ownerFilter', async () => {
    const scope = nock('https://api.github.com', {
        reqheaders: {
          authorization: 'bearer TOKEN',
          'content-type': 'application/json'
        }
      })
      .post('/graphql', "{\"query\":\"\\n    query {\\n      user(login: \\\"awesomo\\\") {\\n        pullRequests(last: 100, states:OPEN) {\\n          edges {\\n            cursor\\n            node {\\n              title\\n              comments {\\n                totalCount\\n              }\\n              body\\n              url\\n              author {\\n                login\\n              }\\n              repository {\\n                owner {\\n                  login\\n                }\\n              }\\n              updatedAt\\n              createdAt\\n            }\\n          }\\n        }\\n      }\\n    }\\n    \"}")
      .reply(200, { data: graphQLResponse })
    const team = ['awesomo'];
    const token = 'TOKEN';
    const ownerFilter = ['org3'];
    const actual = await getPrs(team, token, ownerFilter);
    const expected = openPrsFixture.filter((openPr) => openPr.repository.owner.login === 'org3');

    assert.deepEqual(actual, expected);
    scope.done();
  });
  it('should make a request per user specified', async () => {
    const scope = nock('https://api.github.com', {
        reqheaders: {
          authorization: 'bearer TOKEN',
          'content-type': 'application/json'
        }
      })
      .post('/graphql', "{\"query\":\"\\n    query {\\n      user(login: \\\"awesomo\\\") {\\n        pullRequests(last: 100, states:OPEN) {\\n          edges {\\n            cursor\\n            node {\\n              title\\n              comments {\\n                totalCount\\n              }\\n              body\\n              url\\n              author {\\n                login\\n              }\\n              repository {\\n                owner {\\n                  login\\n                }\\n              }\\n              updatedAt\\n              createdAt\\n            }\\n          }\\n        }\\n      }\\n    }\\n    \"}")
      .reply(200, { data: graphQLResponse });
    const scope2 = nock('https://api.github.com', {
        reqheaders: {
          authorization: 'bearer TOKEN',
          'content-type': 'application/json'
        }
      })
      .post('/graphql', "{\"query\":\"\\n    query {\\n      user(login: \\\"jesus\\\") {\\n        pullRequests(last: 100, states:OPEN) {\\n          edges {\\n            cursor\\n            node {\\n              title\\n              comments {\\n                totalCount\\n              }\\n              body\\n              url\\n              author {\\n                login\\n              }\\n              repository {\\n                owner {\\n                  login\\n                }\\n              }\\n              updatedAt\\n              createdAt\\n            }\\n          }\\n        }\\n      }\\n    }\\n    \"}")
      .reply(200, { data: graphQLResponse });
    const team = ['awesomo', 'jesus'];
    const token = 'TOKEN';
    const ownerFilter = undefined;
    const actual = await getPrs(team, token, ownerFilter);
    const expected = openPrsFixture.concat(openPrsFixture);

    assert.deepEqual(actual, expected);
    scope.done();
    scope2.done();
  });
  it('should not fail if one user request fails', async () => {
    const scope = nock('https://api.github.com', {
        reqheaders: {
          authorization: 'bearer TOKEN',
          'content-type': 'application/json'
        }
      })
      .post('/graphql', "{\"query\":\"\\n    query {\\n      user(login: \\\"awesomo\\\") {\\n        pullRequests(last: 100, states:OPEN) {\\n          edges {\\n            cursor\\n            node {\\n              title\\n              comments {\\n                totalCount\\n              }\\n              body\\n              url\\n              author {\\n                login\\n              }\\n              repository {\\n                owner {\\n                  login\\n                }\\n              }\\n              updatedAt\\n              createdAt\\n            }\\n          }\\n        }\\n      }\\n    }\\n    \"}")
      .reply(200, { data: graphQLResponse });
    const scope2 = nock('https://api.github.com', {
        reqheaders: {
          authorization: 'bearer TOKEN',
          'content-type': 'application/json'
        }
      })
      .post('/graphql', "{\"query\":\"\\n    query {\\n      user(login: \\\"jesus\\\") {\\n        pullRequests(last: 100, states:OPEN) {\\n          edges {\\n            cursor\\n            node {\\n              title\\n              comments {\\n                totalCount\\n              }\\n              body\\n              url\\n              author {\\n                login\\n              }\\n              repository {\\n                owner {\\n                  login\\n                }\\n              }\\n              updatedAt\\n              createdAt\\n            }\\n          }\\n        }\\n      }\\n    }\\n    \"}")
      .reply(500);
    const team = ['awesomo', 'jesus'];
    const token = 'TOKEN';
    const ownerFilter = undefined;
    const actual = await getPrs(team, token, ownerFilter);
    const expected = openPrsFixture;

    assert.deepEqual(actual, expected);
    scope.done();
    scope2.done();
  });
});
