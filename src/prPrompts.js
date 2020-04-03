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
    }
    if (answers.prToOpen !== 'none') {
      opn(answers.prToOpen, { wait: false });
      askContinueQuestion(prQuestion, team, owners);
    }
  });

const askContinueQuestion = (prQuestion, team, owners) => inquirer.prompt([
  {
    type: 'confirm',
    name: 'continue',
    message: 'Would you like to review other outstanding PRs?',
    default: true,
  },
])
  .then((answers) => {
    if (answers.continue) {
      askPrQuestion(prQuestion, team, owners);
    }
  });


module.exports = { askPrQuestion, getPrQuestion };
