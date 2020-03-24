const assert = require('chai').assert;

const prPrompts = require('../../src/prPrompts');

describe('prPrompts', () => {
  context('getPrQuestion()', () => {
    const prs = [
      {
        title: 'pr title 1',
        author: {
          login: 'user1'
        },
        url: 'url_to_open_pr1'
      },
      {
        title: 'pr title 2',
        author: {
          login: 'user2'
        },
        url: 'url_to_open_pr2'
      }
    ];
    const result = prPrompts.getPrQuestion(prs);
    console.log(JSON.stringify(result));
    assert.deepEqual(result, [
      {
        type: 'list',
        name: 'prToOpen',
        message: 'Which pr would you like to review?',
        choices: [
          'all open prs',
          { name: 'pr title 1 (user1)', value: 'url_to_open_pr1' },
          { name: 'pr title 2 (user2)', value: 'url_to_open_pr2' },
          'none'
        ]
      }
    ]);
  });
});
