const config = require('./config');
const githubToken = config.github.token;
const githubTeam = config.github.team;

module.exports = () => {
  const errors = [];
  if (!githubToken) {
    errors.push('A github API token is required to use get-open-prs.');
  }
  if (!githubTeam) {
    errors.push('An array of github usernames is required in the config or function argument');
  }
  console.log(errors.join('\n'));
  return githubToken && githubTeam;
}
