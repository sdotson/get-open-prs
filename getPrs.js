'use strict';
const GitHubApi = require('github');
const github = new GitHubApi();
const config = require('config');
const team = require('./team.json');

const getPrs = () => {
  github.authenticate({ type: 'oauth', token: process.env.GITHUB_TOKEN });
  return github.issues.getAll({ filter: 'all', state: 'open', per_page: 100 })
  .then((res) => {
    return res.data.filter((issue) => {
      return team.includes(issue.user.login) && issue.pull_request;
    });
  });
};

module.exports = getPrs;
