#!/usr/bin/env node
const CLI = require('clui');
const Spinner = CLI.Spinner;
const figlet = require('figlet');
const getPrs = require('../getPrs');
const userPrompts = require('../userPrompts');
const output = require('../output');
const config = require('../config');
const validate = require('../validate');
const team = config.github.team;
const valid = validate();

console.log(figlet.textSync('get prs', { horizontalLayout: 'full' }));

if (valid) {
  const status = new Spinner(`Getting open PRs for the team...`);
  status.start();
  getPrs(team)
  .then((prsData) => {
    status.stop();
    console.log('\n');
    output.generatePrsList(prsData.prs);
    output.generateSummary(prsData.userCounts);
    const prQuestion = userPrompts.getPrQuestion(prsData.prs);
    userPrompts.askPrQuestion(prQuestion);
  });
}
