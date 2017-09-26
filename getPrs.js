'use strict';
const GitHubApi = require('github');
const github = new GitHubApi();
const config = require('config');
const moment = require('moment');
const team = require('./team.json');

const getPrs = () => {
  github.authenticate({ type: 'oauth', token: process.env.GITHUB_TOKEN });
  return github.issues.getAll({ filter: 'all' })
  .then((res) => {
    return res.data.filter((issue) => {
      return team.includes(issue.user.login) && issue.pull_request;
    });
  })
  .then((prs) => {
    return prs.map((pr) => {
      const { title, user, created_at, updated_at, html_url, comments } = pr;
      const username = user.login;
      return { title, username, created_at, updated_at, html_url, comments };
    });
  });
};

module.exports = getPrs;
