var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var routes = require('./routes');

var app = express();

app.use(bodyParser.json()); // get information from html forms
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));

app.set('port', 3000);


module.exports = app;
