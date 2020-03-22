const assert = require('chai').assert;
const sinon = require('sinon');
const figlet = require('figlet');
const chalk = require('chalk');

const { buildGetOpenPrs } = require('../../src/getOpenPrs');
const openPrsFixture = require('../fixtures/pullRequests.json');

describe('getOpenPrs', () => {
  it('should configure defaults if passed --config flag', async () => {
    const printer = sinon.stub();
    const pullRequestGetter = sinon.stub();
    const statusStopper = sinon.stub();
    const statusStarter = sinon.stub();
    const statusIndicator = { start: statusStarter, stop: statusStopper };
    const configureGithubTeam = sinon.stub();
    const configureGithubToken = sinon.stub();
    const configurationQuestionAsker = {
      configureGithubTeam,
      configureGithubToken
    };
    const prQuestionAsker = {};
    const getOpenPrs = buildGetOpenPrs(
      printer, 
      pullRequestGetter, 
      statusIndicator,
      configurationQuestionAsker,
      prQuestionAsker
    );

    const argv = {
      config: true
    };
    const config = new Map();

    await getOpenPrs(argv, config);

    assert(printer.calledWith([figlet.textSync('get prs', { horizontalLayout: 'full' })]), 'should print "GET PRS" logo');
    assert(configureGithubTeam.called, 'configureGithubTeam should be called');
    assert(configureGithubToken.called, 'configureGithubToken should be called');
    assert(pullRequestGetter.notCalled, 'pullRequestGetter should not be called');
  });
  it('should prompt to configure if there is no saved default configuration and nothing is passed in', async () => {
    const printer = sinon.stub();
    const pullRequestGetter = sinon.stub();
    const statusStopper = sinon.stub();
    const statusStarter = sinon.stub();
    const statusIndicator = { start: statusStarter, stop: statusStopper };
    const configureGithubTeam = sinon.stub();
    const configureGithubToken = sinon.stub();
    const configurationQuestionAsker = {
      configureGithubTeam,
      configureGithubToken
    };
    const prQuestionAsker = {};
    const getOpenPrs = buildGetOpenPrs(
      printer, 
      pullRequestGetter, 
      statusIndicator,
      configurationQuestionAsker,
      prQuestionAsker
    );

    const argv = {};
    const config = new Map();

    await getOpenPrs(argv, config);

    assert(configureGithubTeam.called, 'configureGithubTeam should be called');
    assert(configureGithubToken.called, 'configureGithubToken should be called');
  });
  it('should not prompt to configure token if --token is passed in', async () => {
    const printer = sinon.stub();
    const pullRequestGetter = sinon.stub();
    const statusStopper = sinon.stub();
    const statusStarter = sinon.stub();
    const statusIndicator = { start: statusStarter, stop: statusStopper };
    const configureGithubTeam = sinon.stub();
    const configureGithubToken = sinon.stub();
    const configurationQuestionAsker = {
      configureGithubTeam,
      configureGithubToken
    };
    const prQuestionAsker = {};
    const getOpenPrs = buildGetOpenPrs(
      printer, 
      pullRequestGetter, 
      statusIndicator,
      configurationQuestionAsker,
      prQuestionAsker
    );

    const argv = {
      token: 'FAKE_TOKEN'
    };
    const config = new Map();

    await getOpenPrs(argv, config);

    assert(configureGithubTeam.called, 'configureGithubTeam should be called');
    assert(printer.calledWith(['A list of github usernames must be either passed in with --usernames or configured with --configure']), 'should print message');
    assert(configureGithubToken.notCalled, 'configureGithubToken should not be called');
  });
  it('should not prompt to configure usernames if --usernames is passed in', async () => {
    const printer = sinon.stub();
    const pullRequestGetter = sinon.stub();
    const statusStopper = sinon.stub();
    const statusStarter = sinon.stub();
    const statusIndicator = { start: statusStarter, stop: statusStopper };
    const configureGithubTeam = sinon.stub();
    const configureGithubToken = sinon.stub();
    const configurationQuestionAsker = {
      configureGithubTeam,
      configureGithubToken
    };
    const prQuestionAsker = {};
    const getOpenPrs = buildGetOpenPrs(
      printer, 
      pullRequestGetter, 
      statusIndicator,
      configurationQuestionAsker,
      prQuestionAsker
    );

    const argv = {
      usernames: 'user1 user2'
    };
    const config = new Map();

    await getOpenPrs(argv, config);

    assert(configureGithubTeam.notCalled, 'configureGithubTeam should not be called');
    assert(printer.calledWith(['A github token must be provided with --token or configured with --configure']), 'should print message');
    assert(configureGithubToken.called, 'configureGithubToken should be called');
  });
  it('should not prompt to configure if there are already saved defaults', async () => {
    const printer = sinon.stub();
    const pullRequestGetter = sinon.stub();
    const statusStopper = sinon.stub();
    const statusStarter = sinon.stub();
    const statusIndicator = { start: statusStarter, stop: statusStopper };
    const configureGithubTeam = sinon.stub();
    const configureGithubToken = sinon.stub();
    const configurationQuestionAsker = {
      configureGithubTeam,
      configureGithubToken
    };
    const prQuestionAsker = {};
    const getOpenPrs = buildGetOpenPrs(
      printer, 
      pullRequestGetter, 
      statusIndicator,
      configurationQuestionAsker,
      prQuestionAsker
    );

    const argv = {};
    const config = new Map();
    config.set('githubToken', 'FAKE_TOKEN');
    config.set('githubTeam', 'user1 user2');

    await getOpenPrs(argv, config);

    assert(configureGithubTeam.notCalled, 'configureGithubTeam should not be called');
    assert(configureGithubToken.notCalled, 'configureGithubToken should not be called');
  });
  it('should start and stop spinner if pullRequestGetter throws', async () => {
    const printer = sinon.stub();
    const pullRequestGetter = sinon.stub().throws();
    const statusStopper = sinon.stub();
    const statusStarter = sinon.stub();
    const statusIndicator = { start: statusStarter, stop: statusStopper };
    const configureGithubTeam = sinon.stub();
    const configureGithubToken = sinon.stub();
    const configurationQuestionAsker = {
      configureGithubTeam,
      configureGithubToken
    };
    const prQuestionAsker = {};
    const getOpenPrs = buildGetOpenPrs(
      printer, 
      pullRequestGetter, 
      statusIndicator,
      configurationQuestionAsker,
      prQuestionAsker
    );

    const argv = {};
    const config = new Map();
    config.set('githubToken', 'FAKE_TOKEN');
    config.set('githubTeam', 'user1 user2');

    await getOpenPrs(argv, config);

    assert(statusStarter.called, 'statusStarter should be called');
    assert(statusStopper.called, 'statusStopper should be called');

  });
  it('should not ask to select pull request to open if there are no open pull requests', async () => {
    const printer = sinon.stub();
    const pullRequestGetter = sinon.stub().returns([]);
    const statusStopper = sinon.stub();
    const statusStarter = sinon.stub();
    const statusIndicator = { start: statusStarter, stop: statusStopper };
    const configureGithubTeam = sinon.stub();
    const configureGithubToken = sinon.stub();
    const configurationQuestionAsker = {
      configureGithubTeam,
      configureGithubToken
    };
    const prQuestionAsker = {
      askPrQuestion: sinon.stub(),
      getPrQuestion: sinon.stub()
    };
    const getOpenPrs = buildGetOpenPrs(
      printer, 
      pullRequestGetter, 
      statusIndicator,
      configurationQuestionAsker,
      prQuestionAsker
    );

    const argv = {};
    const config = new Map();
    config.set('githubToken', 'FAKE_TOKEN');
    config.set('githubTeam', 'user1 user2');

    await getOpenPrs(argv, config);

    assert(prQuestionAsker.getPrQuestion.notCalled, 'should not call getPrQuestion');
    assert(prQuestionAsker.askPrQuestion.notCalled, 'should not call askPrQuestion');
    assert(printer.calledWith([chalk.green('There are no open prs to review. Congratulations!')]), 'should print message indicating there are no open prs');
  });
  it('should ask to select pull request to open if there are open pull requests', async () => {
    const printer = sinon.stub();
    const pullRequestGetter = sinon.stub().returns(openPrsFixture);
    const statusStopper = sinon.stub();
    const statusStarter = sinon.stub();
    const statusIndicator = { start: statusStarter, stop: statusStopper };
    const configureGithubTeam = sinon.stub();
    const configureGithubToken = sinon.stub();
    const configurationQuestionAsker = {
      configureGithubTeam,
      configureGithubToken
    };
    const prQuestionAsker = {
      askPrQuestion: sinon.stub(),
      getPrQuestion: sinon.stub()
    };
    const getOpenPrs = buildGetOpenPrs(
      printer, 
      pullRequestGetter, 
      statusIndicator,
      configurationQuestionAsker,
      prQuestionAsker
    );

    const argv = {};
    const config = new Map();
    config.set('githubToken', 'FAKE_TOKEN');
    config.set('githubTeam', 'user1 user2');

    await getOpenPrs(argv, config);

    assert(prQuestionAsker.getPrQuestion.called, 'should call getPrQuestion');
    assert(prQuestionAsker.askPrQuestion.called, 'should call askPrQuestion');
  });
});
