const getPrs = require('./getPrs');
const validate = require('./validate');
const config = require('config');

const team = config.get('github.team').split(' ');

const getTeamPrs = (team) => {
  const valid = validate(team);
  if (!valid) return false;
  return getPrs(team);
};

module.exports = getTeamPrs;
