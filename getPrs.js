'use strict';
const GitHubApi = require('github');
const github = new GitHubApi();
const config = require('./config');

const getPrs = (team) => {
  github.authenticate({ type: 'oauth', token: config.github.token });
  return github.issues.getAll({ filter: 'all', state: 'open', per_page: 100 })
  .then((res) => {
    const prs = res.data.filter((issue) => {
      return team.includes(issue.user.login) && issue.pull_request;
    });
    const userCounts = prs.reduce((acc, pr) => {
      if (acc[pr.user.login]) {
        acc[pr.user.login] = acc[pr.user.login] + 1;
      } else {
        acc[pr.user.login] = 1;
      }
      return acc;
    }, {});
    return { prs, userCounts };
  });
};

module.exports = getPrs;
