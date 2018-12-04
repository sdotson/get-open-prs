const opn = require('opn');
const inquirer = require('inquirer');

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
      choices: [...choices, 'none'],
    },
  ];
};

const askPrQuestion = prQuestion => inquirer.prompt(prQuestion)
  .then((answers) => {
    if (answers.prToOpen !== 'none') {
      opn(answers.prToOpen, { wait: false });
      // eslint-disable-next-line no-use-before-define
      askContinueQuestion(prQuestion);
    }
  });

const askContinueQuestion = prQuestion => inquirer.prompt([
  {
    type: 'confirm',
    name: 'continue',
    message: 'Would you like to review other outstanding PRs?',
    default: true,
  },
])
  .then((answers) => {
    if (answers.continue) {
      askPrQuestion(prQuestion);
    }
  });

module.exports = { askPrQuestion, getPrQuestion };
