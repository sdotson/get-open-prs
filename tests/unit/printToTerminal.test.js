const assert = require('chai').assert;
const sinon = require('sinon');

const printToTerminal = require('../../src/printToTerminal');

describe('printToTerminal', () => {
  beforeEach(() => {
    sinon.stub(console, 'log');
  })
  it('should work properly', () => {
    printToTerminal(['whoa', 'there']);
    assert(console.log.calledWith('whoa'), 'console.log should be called with argument 1');
    assert(console.log.calledWith('there'), 'console.log should be called with argument 2');

  });
});
