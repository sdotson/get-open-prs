'use strict';
const config = require('config');

const githubService = require('./services/github');

const getPrs = async (team) => {
  const openPrs = await githubService.getPrs(team);
  const userCounts = team.reduce((acc, member) => {
    acc[member] = openPrs.filter((pr) => pr.author.login === member).length;
    return acc;
  }, {});

  return { prs: openPrs, userCounts, users: team };
};

module.exports = getPrs;
