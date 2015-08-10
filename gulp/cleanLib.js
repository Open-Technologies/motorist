var del = require('del');

function cleanLib(done) {
  del('lib', done);
}

module.exports = cleanLib;
