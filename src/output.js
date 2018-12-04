const chalk = require('chalk');
const moment = require('moment');

const generatePrsList = prs => [].concat.apply(
  [],
  ...prs.map(pr => [
    chalk.green(`${pr.title} (${pr.comments.totalCount} comments)`),
    pr.url,
    `Created by ${pr.author.login} ${moment(pr.createdAt).fromNow()}`,
    `Updated ${moment(pr.updatedAt).fromNow()}`,
    '-----',
  ]),
);

const generateSummary = ({ userCounts, users }) => [
  chalk.green('Summary'),
  ...users.map(user => `${user}: ${userCounts[user]} open prs`),
  '-----',
];

module.exports = {
  generateSummary,
  generatePrsList,
};
