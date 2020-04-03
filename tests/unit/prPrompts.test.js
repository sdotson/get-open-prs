const assert = require('chai').assert;
const sinon = require('sinon');
const inquirer = require('inquirer');
const opn = require('opn');

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
  context('askPrQuestion()', () => {
    // TODO: Make this better
    it('should work', () => {
      const question = [
        {
          type: 'list',
          name: 'prToOpen',
          message: 'Which pr would you like to review?',
          choices: ['all open prs', ...['pr-url-1', 'pr-url-1'], 'none'],
        },
      ];
      const continueQ = [
        {
          type: 'confirm',
          name: 'continue',
          message: 'Would you like to review other outstanding PRs?',
          default: true,
        },
      ];
      const inquirerStub = sinon.stub(inquirer, 'prompt');
      inquirerStub.withArgs(question).resolves({
        prToOpen: 'pr-url-1'
      });
      prPrompts.askPrQuestion(question);
      assert(inquirerStub.calledWith(question), 'inquirer.prompt for pr should be called');
    })
  });
});
