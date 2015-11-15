var webpack = require('webpack');
var gutil = require('gulp-util');

function bundle(cb) {
  webpack({
    entry: {
      vendor: 'babel-polyfill',
      game: './src/game',
      editor: './src/editor'
    },
    output: {
      path: './_game/js',
      filename: '[name].js'
    },
    module: {
      loaders: [
        {test: /\.js$/, exclude: /node_modules/, loader: 'babel', query: {presets: ['es2015', 'stage-0', 'react']}}
      ]
    }
  }, function webpackTaskCallback(err, stats) {
    if (err) {
      throw new gutil.PluginError('webpack', err);
    }
    gutil.log('[webpack]', stats.toString({
      colors: true,
      chunks: false,
      hash: false
    }));
    cb();
  });
}

module.exports = bundle;
