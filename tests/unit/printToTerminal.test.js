const assert = require('chai').assert;
const sinon = require('sinon');

const printToTerminal = require('../../src/printToTerminal');

describe('printToTerminal', () => {
  let consoleStub;
  beforeEach(() => {
    consoleStub = sinon.stub(console, 'log');
  });

  afterEach(() => {
    consoleStub.restore();
  })

  it('should work properly', () => {
    printToTerminal(['whoa', 'there']);
    assert(consoleStub.calledWith('whoa'), 'console.log should be called with argument 1');
    assert(consoleStub.calledWith('there'), 'console.log should be called with argument 2');
  });
});
