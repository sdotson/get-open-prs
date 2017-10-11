#!/usr/bin/env node
const chalk = require('chalk');
const moment = require('moment');
const CLI = require('clui');
const opn = require('opn');
const Spinner = CLI.Spinner;
const figlet = require('figlet');
const inquirer = require('inquirer');
const getPrs = require('./getPrs');

console.log(figlet.textSync('get prs', { horizontalLayout: 'full' }))

const buildPrsOutput = (prs) => {
  prs.forEach((pr) => {
    console.log(chalk.green(`${pr.title} (${pr.comments} comments)`));
    console.log(pr.html_url);
    console.log(`Created by ${pr.username} ${moment(pr.created_at).fromNow()}`);
    console.log('Updated ' + moment(pr.updated_at).fromNow());
    console.log('-----');
  });
};

const generateSummary = (prs) => {
  const userCounts = prs.reduce((acc, pr) => {
    if (acc[pr.username]) {
      acc[pr.username] = acc[pr.username] + 1;
    } else {
      acc[pr.username] = 1;
    }
    return acc;
  }, {});
  console.log(chalk.green('Summary'));
  Object.keys(userCounts).forEach((user) => {
    console.log(`${user}: ${userCounts[user]} open prs`);
  });
  console.log('-----');
};

const getPrQuestion = (prs) => {
  const choices = prs.map((pr) => {
    return {
      name: `${pr.title} (${pr.username})`,
      value: pr.html_url
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
      if (!answers.prToOpen !== 'none') {
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

const status = new Spinner(`Getting open PRs for the team...`);
status.start();
getPrs()
.then((prs) => {
  status.stop();
  console.log('\n');
  buildPrsOutput(prs);
  generateSummary(prs);
  const prQuestion = getPrQuestion(prs);
  askPrQuestion(prQuestion);
});
