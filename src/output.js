const chalk = require('chalk');
const moment = require('moment');

const generatePrsList = (prs) => {
  return [].concat.apply(
    [],
    prs.map((pr) => {
      return [
        chalk.green(`${pr.title} (${pr.comments.totalCount} comments)`),
        pr.url,
        `Created by ${pr.author.login} ${moment(pr.createdAt).fromNow()}`,
        'Updated ' + moment(pr.updatedAt).fromNow(),
        '-----'
      ];
    })
  );
};

const generateSummary = ({ userCounts, users }) => {
  return [
    chalk.green('Summary'),
    ...users.map((user) => {
      return `${user}: ${userCounts[user]} open prs`;
    }),
    '-----'
  ];
};

module.exports = {
  generateSummary,
  generatePrsList
};
