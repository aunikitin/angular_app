var authService = require('../services/authService');
var errorService = require('../services/errorService');
var channelService = require('../services/channelService');
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
                        channelService.addChannel(req, res, channel);
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
            channelService.getChannels(params).then(data =>{
                const result = [];
                for(const channel of data.rows){
                    for(const channelUser of channel.users){
                        if(channelUser.id == user.id){
                            result.push(channel);
                            break;
                        }
                    }
                }
                data.rows = result;
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
                channelService.deleteChannel(id).then(() =>{
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