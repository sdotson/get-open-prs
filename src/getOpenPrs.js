const Conf = require('conf');
const chalk = require('chalk');
const figlet = require('figlet');
const { Spinner } = require('clui');

const { argv } = require('yargs').options({
  config: {
    alias: 'c',
    describe: 'Configure and save Github token and usernames'
  },
  token: {
    alias: 't',
    describe: 'Pass in Github token'
  },
  usernames: {
    alias: 'u',
    describe: 'Pass in Github usernames'
  },
  verbose: {
    alias: 'v',
    describe: 'Print out verbose results for pull requests',
  }
});

const configurationPrompts = require('./configurationPrompts');
const githubService = require('./services/github');
const getPrCountsByUser = require('./getPrCountsByUser');
const output = require('./output');
const printToTerminal = require('./printToTerminal');
const userPrompts = require('./userPrompts');

const config = new Conf({ projectName: 'get-open-prs' });

const getOpenPrs = async () => {
  printToTerminal([figlet.textSync('get prs', { horizontalLayout: 'full' })]);

  if (argv.config) {
    await configurationPrompts.configureGithubTeam();
    await configurationPrompts.configureGithubToken();
    return;
  }

  const githubTeam = argv.usernames || config.get('githubTeam');
  const team = githubTeam && githubTeam.split(' ');
  const githubToken = argv.token || config.get('githubToken');

  if (!team || team.length === 0) {
    console.log('A list of github usernames must be either passed in with --usernames or configured with --configure');
    await configurationPrompts.configureGithubTeam();
  }

  if (!githubToken) {
    console.log('A github token must be provided with --token or configured with --configure');
    await configurationPrompts.configureGithubToken();
  }

  const status = new Spinner('Getting open PRs for the team...');

  try {
    status.start();
    const openPrs = await githubService.getPrs(team);
    const prCountsByUser = getPrCountsByUser(team, openPrs);
    status.stop();

    printToTerminal(['\n']);

    if (argv.verbose) {
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
  } catch (err) {
    status.stop();
    printToTerminal([
      err,
      chalk.red('Could not connect. Please check your config and credentials'),
    ]);
  }
};

module.exports = getOpenPrs;
