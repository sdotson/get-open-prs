const assert = require('chai').assert;
const sinon = require('sinon');
const inquirer = require('inquirer');

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
    const question = [
      {
        type: 'list',
        name: 'prToOpen',
        message: 'Which pr would you like to review?',
        choices: ['all open prs', ...['pr-url-1', 'pr-url-1'], 'none'],
      },
    ];
    const continueQuestion = [
      {
        type: 'confirm',
        name: 'continue',
        message: 'Would you like to review other outstanding PRs?',
        default: true,
      },
    ];

    beforeEach(() => {
      sinon.reset();
    });

    afterEach(() => {
      inquirer.prompt.restore();
    });

    it('should work if user selects pr and declines to continue', async () => {
      const inquirerStub = sinon.stub(inquirer, 'prompt');
      inquirerStub.withArgs(question).resolves({
        prToOpen: 'pr-url-1'
      });
      inquirerStub.withArgs(continueQuestion).resolves({ continue: false });
      await prPrompts.askPrQuestion(question);

      assert(inquirerStub.calledWith(question), 'inquirer.prompt for pr question should be called');
      assert(inquirerStub.calledWith(continueQuestion), 'inquirer.prompt for continue question should be called');
    });

    it('should work if user selects "all open prs"', async () => {
      const team = ['user1', 'user2'];
      const inquirerStub = sinon.stub(inquirer, 'prompt');
      inquirerStub.withArgs(question).resolves({
        prToOpen: 'all open prs'
      });
      inquirerStub.withArgs(continueQuestion).resolves({ continue: false });

      await prPrompts.askPrQuestion(question, team);

      assert(inquirerStub.calledWith(question), 'inquirer.prompt for pr question should be called');
      assert(!inquirerStub.calledWith(continueQuestion), 'inquirer.prompt for continue question should be called');
    });
    
    it('should not prompt further if user selects "none"', async () => {
      const inquirerStub = sinon.stub(inquirer, 'prompt');
      inquirerStub.withArgs(question).resolves({
        prToOpen: 'none'
      });

      await prPrompts.askPrQuestion(question);

      assert(inquirerStub.calledWith(question), 'inquirer.prompt for pr question should be called');
      assert(!inquirerStub.calledWith(continueQuestion), 'inquirer.prompt for continue question should not be called');
    });

    it('should prompt further if user selects "yes"', async () => {
      const inquirerStub = sinon.stub(inquirer, 'prompt');
      inquirerStub.withArgs(question).resolves({
        prToOpen: 'pr-url-1'
      });
      inquirerStub.withArgs(continueQuestion)
        .onFirstCall().resolves({ continue: true })
        .onSecondCall().resolves({ continue: false });

      await prPrompts.askPrQuestion(question);

      assert(inquirerStub.calledWith(question), 'inquirer.prompt for pr question should be called');
      assert(inquirerStub.calledWith(continueQuestion), 'inquirer.prompt for continue question should be called');
      assert(inquirerStub.callCount === 4, 'inquirer should be called twice for continue and twice for prs');
    });
  });
});
