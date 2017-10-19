const mock = require('mock-require');

mockGithub = function(fixture) {
  mock('github', function() {
    this.authenticate = () => {
      return true;
    };
    this.issues = {
      getAll: () => {
        return Promise.resolve({
          data: fixture
        });
      }
    }
  });
}

module.exports = {
  mockGithub
}
