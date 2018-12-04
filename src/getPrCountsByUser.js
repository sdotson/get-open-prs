

const getPrCountsByUser = (team, openPrs) => team.reduce((acc, member) => {
  acc[member] = openPrs.filter(pr => pr.author.login === member).length;
  return acc;
}, {});

module.exports = getPrCountsByUser;
