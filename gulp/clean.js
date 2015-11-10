var del = require('del');

function clean(done) {
  del('_game', done);
}

module.exports = clean;
