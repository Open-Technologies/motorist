'use strict';

var express = require('express');
var serverConfig = require('./configs/server');

var app = express();

// Static files
app.use(express.static('lib'));

// React Router
app.use(function (req, res) {
  res.sendFile('lib/index.html', {
    root: __dirname
  });
});

app.listen(serverConfig.port, function () {
  console.log('Example app listening at localhost:' + serverConfig.port);
});
