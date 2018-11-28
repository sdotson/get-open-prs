'use strict';

const getPrCountsByUser = (team, openPrs) => {
  return team.reduce((acc, member) => {
    acc[member] = openPrs.filter((pr) => pr.author.login === member).length;
    return acc;
  }, {});
};

module.exports = getPrCountsByUser;
