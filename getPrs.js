'use strict';
const GitHubApi = require('github');
const github = new GitHubApi();
const config = require('config');

const getPrs = (team) => {
  github.authenticate({ type: 'oauth', token: config.get('github.token') });
  return github.issues.getAll({ filter: 'all', state: 'open', per_page: 100 })
  .then((res) => {
    const prs = res.data.filter((issue) => {
      return team.includes(issue.user.login) && issue.pull_request;
    });

    let userCounts = {};
    
    team.forEach((member) => {
      userCounts[member] = prs.filter((pr) => pr.user.login === member).length;
    });

    return { prs, userCounts, users: team };
  });
};

module.exports = getPrs;
