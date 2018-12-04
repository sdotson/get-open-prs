const { Spinner } = require('clui');
const chalk = require('chalk');

const figlet = require('figlet');
// eslint-disable-next-line
const argv = require('yargs').argv;

const getPrCountsByUser = require('./getPrCountsByUser');
const userPrompts = require('./userPrompts');
const validate = require('./validate');
const output = require('./output');
const printToTerminal = require('./printToTerminal');

const valid = validate();
const githubService = require('./services/github');
const config = require('./services/config');

const getOpenPrs = async () => {
  printToTerminal([figlet.textSync('get prs', { horizontalLayout: 'full' })]);
  const team = argv.t ? argv.t.split(' ') : config.github.team.split(' ');
  const status = new Spinner('Getting open PRs for the team...');

  try {
    if (valid) {
      status.start();

      const openPrs = await githubService.getPrs(team);
      const prCountsByUser = getPrCountsByUser(team, openPrs);
      status.stop();
      printToTerminal(['\n']);

      if (argv.v) {
        const detailedPrsList = output.generatePrsList(openPrs);
        printToTerminal(detailedPrsList);
      }

      const summary = output.generateSummary({ userCounts: prCountsByUser, users: team });
      printToTerminal(summary);

      if (openPrs.length) {
        const prQuestion = userPrompts.getPrQuestion(openPrs);
        userPrompts.askPrQuestion(prQuestion);
      } else {
        printToTerminal([chalk.green('There are no open prs to review. Congratulations!')]);
      }
    }
  } catch (err) {
    status.stop();
    printToTerminal([
      err,
      chalk.red('Could not connect. Please check your config and credentials'),
    ]);
  }
};

module.exports = getOpenPrs;
