'use strict';
const config = require('./config');
const chalk = require('chalk');
const { GraphQLClient } = require('graphql-request');
const gql = require('graphql-tag');

const GITHUB_API_URL = 'https://api.github.com/graphql';

const graphqlClient = new GraphQLClient(GITHUB_API_URL, {
  headers: {
    'Authorization': `bearer ${config.github.token}`
  }
});

const getPrs = async (team) => {
  try {
    const res = await Promise.all(
      team.map(getPrsByLogin)
    );
    return Array.prototype.concat.apply([], res);
  } catch (err) {
    console.log(chalk.red(`Something went wrong. Verify your github token.`), err);
  }
};

const getPrsByLogin = async (login) => {
  try {
    const query = `
    query {
      user(login: ${login}) {
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
    const { user: { pullRequests: { edges } }} = await graphqlClient.request(query);
    return edges.map(edge => edge.node);
  } catch (err) {
    console.log(chalk.red(`Could not retrieve pull requests for user ${login}`));
  }
};

module.exports = {
  getPrs
};
