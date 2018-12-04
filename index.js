const getPrs = require('./src/getOpenPrs');
const validate = require('./src/validate');

const getTeamPrs = (team) => {
  const valid = validate(team);
  if (!valid) return false;
  return getPrs(team);
};

module.exports = getTeamPrs;
