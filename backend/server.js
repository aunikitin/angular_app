var ModelBuilder = require('./services/modelBuilder');
var router = require('./routes');
var http = require('http');
var socket = require('socket.io');
var port = 3000;

const modelBuilder = new ModelBuilder();
modelBuilder.buildModels();

const requestHandler = (req, res) => {
    router.defineRoutes(req, res);
    console.log(req.url);
};

const server = http.createServer(requestHandler);
const io = socket(server);

io.on('connect', (socket) => {
    console.log('a user connected');
});

io.on('disconnect', () => {
    console.log('Client disconnected');
});

server.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`)
});