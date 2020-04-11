const assert = require('chai').assert;
const sinon = require('sinon');
const inquirer = require('inquirer');

const configurationPrompts = require('../../src/configurationPrompts');

describe('configurationPrompts', () => {
  beforeEach(() => {
    sinon.reset();
  });

  afterEach(() => {
    inquirer.prompt.restore();
  });

  context('configureGithubOwners()', () => {
    const question = [
      {
        type: 'input',
        name: 'githubOwners',
        message: 'Github repo orgs and owners, each one separated by a space. Leave blank to return all. Type "clear" to remove previously entered default.',
        default: 'oldOrg1'
      }
    ];
    it('should work properly for standard use case', async () => {
      const inquirerStub = sinon.stub(inquirer, 'prompt');
      inquirerStub.withArgs(question).resolves({
        githubOwners: 'org1 org2'
      });

      const config = new Map();
      config.set('githubOwners', 'oldOrg1');
      await configurationPrompts.configureGithubOwners(config);

      assert(inquirerStub.calledWith(question), 'inquirer.prompt for question should be called');
      assert(config.get('githubOwners') === 'org1 org2', 'githubOwners should be set on config');
    });
    it('should work properly for clear use case', async () => {
      const inquirerStub = sinon.stub(inquirer, 'prompt');
      inquirerStub.withArgs(question).resolves({
        githubOwners: 'clear'
      });

      const config = new Map();
      config.set('githubOwners', 'oldOrg1');
      await configurationPrompts.configureGithubOwners(config);

      assert(inquirerStub.calledWith(question), 'inquirer.prompt for question should be called');
      assert(config.get('githubOwners') === '', 'githubOwners should be unset on config');
    });
  });

  context('configureGithubTeam()', () => {
    const question = [
      {
        type: 'input',
        name: 'githubUsernames',
        message: 'Github usernames, each one separated by a space. (E.g. user1 user2 user3)',
        default: 'olduser1 olduser2',
      },
    ];
    const confirmation = [
      {
        type: 'confirm',
        name: 'githubConfirmation',
        message: `Are these Github usernames correct?: user1 user2`,
        default: true,
      },
    ];
    const confirmation2 = [
      {
        type: 'confirm',
        name: 'githubConfirmation',
        message: `Are these Github usernames correct?: user4 user5`,
        default: true,
      },
    ];

    it('should work properly', async () => {
      const inquirerStub = sinon.stub(inquirer, 'prompt');
      inquirerStub.withArgs(question).resolves({
        githubUsernames: 'user1 user2'
      });
      inquirerStub.withArgs(confirmation).resolves({
        githubConfirmation: true
      });

      const config = new Map();
      config.set('githubTeam', 'olduser1 olduser2');
      await configurationPrompts.configureGithubTeam(config);

      assert(inquirerStub.calledWith(question), 'inquirer.prompt for question should be called');
      assert(inquirerStub.calledWith(confirmation), 'inquirer.prompt for confirmation should be called');
      assert(config.get('githubTeam') === 'user1 user2', 'githubTeam should be set on config');
    });

    it('should work properly if user does not confirm at first', async () => {
      const inquirerStub = sinon.stub(inquirer, 'prompt');
      inquirerStub.withArgs(question)
        .onFirstCall()
        .resolves({    
          githubUsernames: 'user1 user2'
        })
        .onSecondCall()
        .resolves({
          githubUsernames: 'user4 user5'
        });

      inquirerStub.withArgs(confirmation)
        .resolves({
          githubConfirmation: false
        });
      inquirerStub.withArgs(confirmation2)
        .resolves({
          githubConfirmation: true
        });

      const config = new Map();
      config.set('githubTeam', 'olduser1 olduser2');
      await configurationPrompts.configureGithubTeam(config);

      assert(inquirerStub.calledWith(question), 'inquirer.prompt for question should be called');
      assert(inquirerStub.calledWith(confirmation), 'inquirer.prompt for confirmation should be called');
      assert(config.get('githubTeam') === 'user4 user5', 'githubTeam should be set on config');
    });
  });

  context('configureGithubToken()', () => {
    const question = [
      {
        type: 'input',
        name: 'githubToken',
        message: 'Please enter your Github token:',
        default: ''
      }
    ];

    let consoleStub;
    beforeEach(() => {
      consoleStub = sinon.stub(console, 'log');
    });

    afterEach(() => {
      consoleStub.restore();
    })

    it('should work properly', async () => {
      const inquirerStub = sinon.stub(inquirer, 'prompt');
      inquirerStub.withArgs(question).resolves({
        githubToken: 'TOKEN'
      });

      const config = new Map();
      config.set('githubToken', '');
      await configurationPrompts.configureGithubToken(config);

      assert(inquirerStub.calledWith(question), 'inquirer.prompt for question should be called');
      assert(config.get('githubToken') === 'TOKEN', 'githubTeam should be set on config');
    });

    it('should prompt again if answer is falsey', async () => {
      const inquirerStub = sinon.stub(inquirer, 'prompt');
      inquirerStub.withArgs(question)
        .onFirstCall().resolves({
          githubToken: ''
        })
        .onSecondCall().resolves({
          githubToken: 'TOKEN'
        });

      const config = new Map();
      config.set('githubToken', '');
      await configurationPrompts.configureGithubToken(config);

      assert(inquirerStub.calledWith(question), 'inquirer.prompt for question should be called');
      assert(consoleStub.calledWith('Github token is required to fetch pull requests.'), 'console.log should be called with error message');
      assert(config.get('githubToken') === 'TOKEN', 'githubTeam should be set on config');
    });
  });
});
