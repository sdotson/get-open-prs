#!/usr/bin/env node
const Conf = require('conf');
const { argv } = require('yargs').options({
  all: {
    alias: 'a',
    describe: 'Open browser window displaying all open prs'
  },
  config: {
    alias: 'c',
    describe: 'Configure and save Github token and usernames'
  },
  owners: {
    alias: 'o',
    describe: 'Narrow results down to specific Github organizations/owners'
  },
  token: {
    alias: 't',
    describe: 'Pass in Github token'
  },
  usernames: {
    alias: 'u',
    describe: 'Pass in Github usernames'
  },
  verbose: {
    alias: 'v',
    describe: 'Print out verbose results for pull requests',
  }
});

const { getOpenPrs } = require('../src/getOpenPrs');

const config = new Conf({ projectName: 'get-open-prs' });

getOpenPrs(argv, config);
