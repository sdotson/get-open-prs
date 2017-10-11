const chalk = require('chalk');
const moment = require('moment');

const generatePrsList = (prs) => {
  prs.forEach((pr) => {
    console.log(chalk.green(`${pr.title} (${pr.comments} comments)`));
    console.log(pr.html_url);
    console.log(`Created by ${pr.user.login} ${moment(pr.created_at).fromNow()}`);
    console.log('Updated ' + moment(pr.updated_at).fromNow());
    console.log('-----');
  });
};

const generateSummary = (prs) => {
  const userCounts = prs.reduce((acc, pr) => {
    if (acc[pr.user.login]) {
      acc[pr.user.login] = acc[pr.user.login] + 1;
    } else {
      acc[pr.user.login] = 1;
    }
    return acc;
  }, {});
  console.log(chalk.green('Summary'));
  Object.keys(userCounts).forEach((user) => {
    console.log(`${user}: ${userCounts[user]} open prs`);
  });
  console.log('-----');
};

module.exports = {
  generateSummary,
  generatePrsList
};
