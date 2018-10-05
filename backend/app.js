var express = require('express');
var bodyParser = require('body-parser');
var routes = require('./routes');

var app = express();

app.use(bodyParser.json()); // get information from html forms
app.use(express.urlencoded({ extended: true }));

app.set('port', 8080);

app.all("/*", function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
});

routes.init(app);

app.listen(() => {
    console.log(`app listening on port ${8080}`);
});

