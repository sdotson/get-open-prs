#!/usr/bin/env node
const CLI = require('clui');
const chalk = require('chalk');
const Spinner = CLI.Spinner;
const figlet = require('figlet');
const getPrs = require('./getPrs');
const userPrompts = require('./userPrompts');
const output = require('./output');
const config = require('config');
const validate = require('./validate');
const argv = require('yargs').argv;
const valid = validate();

const getOpenPrs = async () => {
  console.log(figlet.textSync('get prs', { horizontalLayout: 'full' }));
  
  const team = argv.t ? argv.t.split(' ') : config.get('github.team').split(' ');
  const status = new Spinner(`Getting open PRs for the team...`);

  try {
    if (valid) {
      status.start();
    
      const prsData = await getPrs(team);
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
    }
  } catch (err) {
    status.stop();
    console.log(err);
    console.log(chalk.red('Could not connect. Please check your config and credentials'));
  }
};

module.exports = getOpenPrs;
