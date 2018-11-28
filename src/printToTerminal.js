const chalk = require('chalk');

const printToTerminal = (linesToPrint) => {
  linesToPrint.forEach(line => {
    console.log(line);
  });
};

module.exports = printToTerminal;
