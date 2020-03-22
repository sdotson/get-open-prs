const getPrs = require('./src/getOpenPrs');

const getTeamPrs = team => getPrs(team);

module.exports = getTeamPrs;
