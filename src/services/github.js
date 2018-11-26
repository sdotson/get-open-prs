'use strict';
const config = require('config');
const { GraphQLClient } = require('graphql-request');
const gql = require('graphql-tag');

const GITHUB_API_URL = 'https://api.github.com/graphql';

const graphqlClient = new GraphQLClient(GITHUB_API_URL, {
  headers: {
    'Authorization': `bearer ${config.get('github.token')}`
  }
});

const getPrs = async (team) => {
  const res = await Promise.all(
    team.map(getPrsByLogin)
  );
  return Array.prototype.concat.apply([], res);
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
    console.log('err', err);
  }
};

module.exports = {
  getPrs
};
