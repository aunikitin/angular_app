var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cors = require('cors');
var routes = require('./routes');

var app = express();

routes.init(app);
app.set('port', 8080);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../')));

module.exports = app;
