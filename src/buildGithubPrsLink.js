module.exports = (team, githubOwners = []) => {
  const usernames = `+author%3A${team.join('+author%3A')}`;
  const owners = githubOwners.length > 0 ? `+org%3A${githubOwners.join('+org%3A')}` : '';
  return `https://github.com/search?q=is%3Aopen+is%3Apr${owners}${usernames}`;
};
