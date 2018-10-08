// var app = require('./app');
var router = require('./routes');
var http = require('http');
var port = 3000;

const requestHandler = (req, res) => {
    router.defineRoutes(req, res);
    console.log(req.url);
};

const server = http.createServer(requestHandler);

server.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`)
});