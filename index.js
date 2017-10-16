const getPrs = require('./getPrs');
const userPrompts = require('./userPrompts');
const output = require('./output');
const config = require('./config');
const validate = require('./validate');

const team = config.github.team;

const getTeamPrs = (team) => {
  const valid = validate(team);
  if (!valid) return false;
  return getPrs(team);
};

module.exports = getTeamPrs;
