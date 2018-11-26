const getPrs = require('./src/getPrs');
const validate = require('./src/validate');
const config = require('config');

const team = config.get('github.team').split(' ');

const getTeamPrs = (team) => {
  const valid = validate(team);
  if (!valid) return false;
  return getPrs(team);
};

module.exports = getTeamPrs;
