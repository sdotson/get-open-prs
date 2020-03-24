module.exports = (team) => {
  const usernames = `+author%3A${team.join('+author%3A')}`;
  return `https://github.com/search?q=is%3Aopen+is%3Apr${usernames}`;
};
