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
    socket.on('message', (msg) =>{
        if(msg.hasOwnProperty("action")){
            socket.broadcast.to(socket.id).emit('server message: ', msg.text);
        }else{
            socket.broadcast.to(socket.id).emit('message', msg.text);
        }
        io.emit('message', {'msg': msg.text});
    });
    socket.on('room', (room) => {
        socket.join(room);
    });
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
    console.log('User connected');
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