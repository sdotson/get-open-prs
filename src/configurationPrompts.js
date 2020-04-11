const inquirer = require('inquirer');

const configureGithubTeam = async (config) => {
  const { githubUsernames } = await inquirer.prompt([
    {
      type: 'input',
      name: 'githubUsernames',
      message: 'Github usernames, each one separated by a space. (E.g. user1 user2 user3)',
      default: config.get('githubTeam'),
    },
  ]);

  const { githubConfirmation } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'githubConfirmation',
      message: `Are these Github usernames correct?: ${githubUsernames}`,
      default: true,
    },
  ]);

  if (!githubConfirmation) {
    return configureGithubTeam(config);
  }
  return config.set('githubTeam', githubUsernames);
};

const configureGithubToken = async (config) => {
  const { githubToken } = await inquirer.prompt([
    {
      type: 'input',
      name: 'githubToken',
      message: 'Please enter your Github token:',
      default: config.get('githubToken')
    }
  ]);
  if (!githubToken) {
    console.log('Github token is required to fetch pull requests.');
    return configureGithubToken(config);
  }
  return config.set('githubToken', githubToken);
};

const configureGithubOwners = async (config) => {
  const { githubOwners } = await inquirer.prompt([
    {
      type: 'input',
      name: 'githubOwners',
      message: 'Github repo orgs and owners, each one separated by a space. Leave blank to return all. Type "clear" to remove previously entered default.',
      default: config.get('githubOwners')
    }
  ]);
  const newValue = githubOwners === 'clear' ? '' : githubOwners;
  config.set('githubOwners', newValue);
};

module.exports = {
  configureGithubOwners,
  configureGithubTeam,
  configureGithubToken
};
