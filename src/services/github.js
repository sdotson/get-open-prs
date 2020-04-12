
const chalk = require('chalk');
const { GraphQLClient } = require('graphql-request');
const _ = require('lodash');

const GITHUB_API_URL = 'https://api.github.com/graphql';

const getPrs = async (team, token, ownerFilter) => {
  const res = await Promise.all(
    team.map(username => getPrsByLogin(username, token, ownerFilter))
  );
  return Array.prototype.concat.apply([], res);
};

const getPrsByLogin = async (login, token, ownerFilter = []) => {
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
              repository {
                owner {
                  login
                }
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
    return edges.map(edge => edge.node).filter((node) => {
      const isAllowedOwner = ownerFilter.includes(_.get(node, 'repository.owner.login'));
      return ownerFilter.length === 0 || isAllowedOwner;
    });
  } catch (err) {
    console.log(err);
    console.log(chalk.red(`Could not retrieve pull requests for user ${login}`));
  }
  return [];
};

module.exports = {
  getPrs
};
