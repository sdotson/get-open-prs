const Conf = require('conf');
const inquirer = require('inquirer');

const config = new Conf({ projectName: 'get-open-prs' });

const configureGithubTeam = async () => {
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
    await configureGithubTeam();
  }
  config.set('githubTeam', githubUsernames);
};

const configureGithubToken = async () => {
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
    await configureGithubToken();
  }
  config.set('githubToken', githubToken);
};

module.exports = {
  configureGithubTeam,
  configureGithubToken
};
