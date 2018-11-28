const CLI = require('clui');
const chalk = require('chalk');
const Spinner = CLI.Spinner;
const figlet = require('figlet');
const config = require('config');
const argv = require('yargs').argv;

const getPrCountsByUser = require('./getPrCountsByUser');
const userPrompts = require('./userPrompts');
const validate = require('./validate');
const output = require('./output');

const valid = validate();
const githubService = require('./services/github');

const getOpenPrs = async () => {
  console.log(figlet.textSync('get prs', { horizontalLayout: 'full' }));
  
  const team = argv.t ? argv.t.split(' ') : config.get('github.team').split(' ');
  const status = new Spinner(`Getting open PRs for the team...`);

  try {
    if (valid) {
      status.start();
      
      const openPrs = await githubService.getPrs(team);
      const prCountsByUser = getPrCountsByUser(team, openPrs);
      status.stop();
      console.log('\n');
  
      if (argv.v) {
        output.generatePrsList(openPrs);
      }

      output.generateSummary({ userCounts: prCountsByUser, users: team });

      if (openPrs.length) {
        const prQuestion = userPrompts.getPrQuestion(openPrs);
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
