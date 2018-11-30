const opn = require('opn');
const inquirer = require('inquirer');

const getPrQuestion = (prs) => {
  const choices = prs.map((pr) => {
    return {
      name: `${pr.title} (${pr.author.login})`,
      value: pr.url
    };
  });
  return [
    {
      type: 'list',
      name: 'prToOpen',
      message: 'Which pr would you like to review?',
      choices: [...choices, 'none']
    }
  ];
};

const askPrQuestion = (prQuestion) => {
  return inquirer.prompt(prQuestion)
    .then((answers) => {
      if (answers.prToOpen !== 'none') {
        opn(answers.prToOpen, { wait: false} );
        askContinueQuestion(prQuestion);
      }
    });
};

const askContinueQuestion = (prQuestion) => {
  return inquirer.prompt([
    {
      type: 'confirm',
      name: 'continue',
      message: 'Would you like to review other outstanding PRs?',
      default: true
    }
  ])
    .then((answers) => {
      if (answers.continue) {
        askPrQuestion(prQuestion);
      }
    });
};

module.exports = { askPrQuestion, getPrQuestion };
