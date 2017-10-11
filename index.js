#!/usr/bin/env node
const CLI = require('clui');
const Spinner = CLI.Spinner;
const figlet = require('figlet');
const getPrs = require('./getPrs');
const userPrompts = require('./userPrompts');
const output = require('./output');

console.log(figlet.textSync('get prs', { horizontalLayout: 'full' }));

const status = new Spinner(`Getting open PRs for the team...`);
status.start();
getPrs()
.then((prs) => {
  status.stop();
  console.log('\n');
  output.generatePrsList(prs);
  output.generateSummary(prs);
  const prQuestion = userPrompts.getPrQuestion(prs);
  userPrompts.askPrQuestion(prQuestion);
});
