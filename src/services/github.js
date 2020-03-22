
const chalk = require('chalk');
const { GraphQLClient } = require('graphql-request');

const GITHUB_API_URL = 'https://api.github.com/graphql';

const getPrs = async (team, token) => {
  try {
    const res = await Promise.all(
      team.map(username => getPrsByLogin(username, token)),
    );
    return Array.prototype.concat.apply([], res);
  } catch (err) {
    console.log(chalk.red('Something went wrong. Verify your github token.'), err);
  }
  return [];
};

const getPrsByLogin = async (login, token) => {
  const graphqlClient = new GraphQLClient(GITHUB_API_URL, {
    headers: {
      Authorization: `bearer ${token}`,
    },
  });
  try {
    const query = `
    query {
      user(login: "${login}") {
        pullRequests(last: 100, states:OPEN) {
          edges {
            cursor
            node {
              title
              comments {
                totalCount
              }
              body
              url
              author {
                login
              }
              updatedAt
              createdAt
            }
          }
        }
      }
    }
    `;
    const { user: { pullRequests: { edges } } } = await graphqlClient.request(query);
    return edges.map(edge => edge.node);
  } catch (err) {
    console.log(err);
    console.log(chalk.red(`Could not retrieve pull requests for user ${login}`));
  }
  return [];
};

module.exports = {
  getPrs,
};
