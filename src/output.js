const chalk = require('chalk');
const moment = require('moment');

const generatePrsList = (prs) => {
  prs.forEach((pr) => {
    console.log(chalk.green(`${pr.title} (${pr.comments.totalCount} comments)`));
    console.log(pr.url);
    console.log(`Created by ${pr.author.login} ${moment(pr.createdAt).fromNow()}`);
    console.log('Updated ' + moment(pr.updatedAt).fromNow());
    console.log('-----');
  });
};

const generateSummary = ({ userCounts, users }) => {
  console.log(chalk.green('Summary'));
  users.forEach((user) => {
    console.log(`${user}: ${userCounts[user]} open prs`);
  });
  console.log('-----');
};

module.exports = {
  generateSummary,
  generatePrsList
};
