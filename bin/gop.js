#!/usr/bin/env node
const CLI = require('clui');
const chalk = require('chalk');
const Spinner = CLI.Spinner;
const figlet = require('figlet');
const getPrs = require('../getPrs');
const userPrompts = require('../userPrompts');
const output = require('../output');
const config = require('../config');
const validate = require('../validate');
const argv = require('yargs').argv;
const valid = validate();
const updateNotifier = require('update-notifier');
const pkg = require('../package.json');

updateNotifier({pkg}).notify();

console.log(figlet.textSync('get prs', { horizontalLayout: 'full' }));

const team = argv.t ? argv.t.split(' ') : config.github.team;

if (valid) {
  const status = new Spinner(`Getting open PRs for the team...`);
  status.start();
  getPrs(team)
  .then((prsData) => {
    status.stop();
    console.log('\n');

    if (argv.v) {
      output.generatePrsList(prsData.prs);
    }

    output.generateSummary(prsData);

    if (prsData.prs.length) {
      const prQuestion = userPrompts.getPrQuestion(prsData.prs);
      userPrompts.askPrQuestion(prQuestion);
    } else {
      console.log(chalk.green('There are no open prs to review. Congratulations!'))
    }
  });
}
