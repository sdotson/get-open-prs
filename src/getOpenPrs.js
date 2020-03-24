const chalk = require('chalk');
const figlet = require('figlet');
const opn = require('opn');
const { Spinner } = require('clui');

const buildGithubPrsLink = require('./buildGithubPrsLink');
const configurationPrompts = require('./configurationPrompts');
const githubService = require('./services/github');
const getPrCountsByUser = require('./getPrCountsByUser');
const output = require('./output');
const printToTerminal = require('./printToTerminal');
const prPrompts = require('./prPrompts');

const statusSpinner = new Spinner('Getting open PRs for the team...');

const buildGetOpenPrs = (
  printer, // terminalPrinter
  pullRequestGetter, // githubService.getPrs
  statusIndicator, // status
  configurationQuestionAsker, // configuration prompts
  prQuestionAsker, // select open prs
  urlOpener // opens web browser with given URL
) => async (argv, config) => {
  printer([figlet.textSync('get prs', { horizontalLayout: 'full' })]);

  if (argv.config) {
    await configurationQuestionAsker.configureGithubTeam(config);
    await configurationQuestionAsker.configureGithubToken(config);
    return;
  }

  const githubTeam = argv.usernames || config.get('githubTeam');
  const team = githubTeam && githubTeam.split(' ');
  const githubToken = argv.token || config.get('githubToken');

  if (!team || team.length === 0) {
    printer(['A list of github usernames must be either passed in with --usernames or configured with --configure']);
    await configurationQuestionAsker.configureGithubTeam(config);
  }

  if (argv.all) {
    const url = buildGithubPrsLink(team);
    urlOpener(url, { wait: false });
    return;
  }

  if (!githubToken) {
    printer(['A github token must be provided with --token or configured with --configure']);
    await configurationQuestionAsker.configureGithubToken(config);
  }

  try {
    statusIndicator.start();
    const openPrs = await pullRequestGetter(team, githubToken);
    const prCountsByUser = getPrCountsByUser(team, openPrs);
    statusIndicator.stop();

    printer(['\n']);

    if (argv.verbose) {
      const detailedPrsList = output.generatePrsList(openPrs);
      printer(detailedPrsList);
    }

    const summary = output.generateSummary({ userCounts: prCountsByUser, users: team });
    printer(summary);

    if (openPrs.length) {
      const prQuestion = prQuestionAsker.getPrQuestion(openPrs);
      prQuestionAsker.askPrQuestion(prQuestion, team);
    } else {
      printer([chalk.green('There are no open prs to review. Congratulations!')]);
    }
  } catch (err) {
    statusIndicator.stop();
    printer([
      err,
      chalk.red('Could not connect. Please check your config and credentials'),
    ]);
  }
};

const getOpenPrs = buildGetOpenPrs(
  printToTerminal,
  githubService.getPrs,
  statusSpinner,
  configurationPrompts,
  prPrompts,
  opn
);

module.exports = {
  buildGetOpenPrs,
  getOpenPrs
};
