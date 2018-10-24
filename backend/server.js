var ModelBuilder = require('./services/modelBuilder');
var messageService = require('./services/messageService');
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
        if(msg.message.hasOwnProperty("action")){
            io.emit('message', msg.message);
        }else{
            messageService.saveMessage(msg).then((createTime) => {
                msg.message.createdAt = createTime;
                io.emit('message', msg.message);
            },
            err => console.log('message fail: '+ err));
        }
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