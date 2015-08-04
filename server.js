'use strict';

var express = require('express');
var serverConfig = require('./configs/server');

var app = express();

app.use('/', express.static('static'));

app.listen(serverConfig.port, function () {
  console.log('Example app listening at localhost:' + serverConfig.port);
});
