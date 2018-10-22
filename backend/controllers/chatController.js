var authService = require('../services/authService');
var errorService = require('../services/errorService');
var chatService = require('../services/chatService');
var bodyParser = require('../services/bodyParser');

function addChannel(req, res){
    try{
        const callback = (err, user) =>{
            if(err){
                errorService.writeErrorToHead(res, err, 401);
                res.end();
            }else{
                const afterParseBody = (channel) => {
                    if(user.accessLevel < 1){
                        chatService.addChannel(req, res, channel);
                        // .then(() =>{
                        //     res.writeHead(200);
                        //     res.end();
                        // });
                    }else{
                        errorService.writeErrorToHead(res, err, 401);
                        res.end();
                    }
                }
                bodyParser.parseBody(req, afterParseBody);
            }
        }
        authService.getUserFromToken(req, res, callback);
    }catch(err){
        res.write(err.message);
        res.end('fail');
    }
}

function getChannels(req, res, params){
    const callback = (err, user) =>{
        if(err){
            errorService.writeErrorToHead(res, err, 401);
            res.end();
        }else{
            chatService.getChannels(params, user).then(data =>{
                res.write(JSON.stringify(data));
                res.end();
            });
        }
    }
    authService.getUserFromToken(req, res, callback);
}

function deleteChannel(req, res, params){
    const callback = (err, user) =>{
        if(err){
            errorService.writeErrorToHead(res, err, 401);
            res.end();
        }else{
            if(user.accessLevel < 1){
                const id = params.id;
                chatService.deleteChannel(id).then(() =>{
                    res.writeHead(200);
                    res.end();
                });
            }else{
                errorService.writeErrorToHead(res, err, 401);
                res.end();
            }
        }
    }
    authService.getUserFromToken(req, res, callback);
}

module.exports = {
    addChannel: addChannel,
    getChannels: getChannels,
    deleteChannel: deleteChannel
}