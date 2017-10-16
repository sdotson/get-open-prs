const config = require('./config');
const githubToken = config.github.token;

module.exports = (team) => {
  const errors = [];
  if (!githubToken) {
    errors.push('A github API token is required to use get-open-prs.');
  }
  if (!team) {
    errors.push('An array of github usernames is required in the config or function argument');
  }
  console.log(errors.join('\n'));
  return githubToken && team;
}
