const opn = require('opn');
const inquirer = require('inquirer');

const buildGithubPrsLink = require('./buildGithubPrsLink');

const getPrQuestion = (prs) => {
  const choices = prs.map(pr => ({
    name: `${pr.title} (${pr.author.login})`,
    value: pr.url,
  }));
  return [
    {
      type: 'list',
      name: 'prToOpen',
      message: 'Which pr would you like to review?',
      choices: ['all open prs', ...choices, 'none'],
    },
  ];
};

const askPrQuestion = (prQuestion, team, owners) => inquirer.prompt(prQuestion)
  .then((answers) => {
    if (answers.prToOpen === 'all open prs') {
      const url = buildGithubPrsLink(team, owners);
      opn(url, { wait: false });
      return false;
    }

    if (!['all open prs', 'none'].includes(answers.prToOpen)) {
      opn(answers.prToOpen, { wait: false });
      return askContinueQuestion(prQuestion, team, owners);
    }
    return false;
  });

const askContinueQuestion = (prQuestion, team, owners) => inquirer.prompt([
  {
    type: 'confirm',
    name: 'continue',
    message: 'Would you like to review other outstanding PRs?',
    default: true,
  }
])
  .then((answers) => {
    if (answers.continue) {
      return askPrQuestion(prQuestion, team, owners);
    }
    return false;
  });


module.exports = { askPrQuestion, getPrQuestion };
