const team = process.env.GITHUB_TEAM && process.env.GITHUB_TEAM.split(' ');

module.exports = {
  github: {
    team: team,
    token: process.env.GITHUB_TOKEN
  }
};
