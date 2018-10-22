var errorService = require('../services/errorService');
var chatRepository = require('../repository/chatRepository');
var vulnerabilitiesRepository = require('../repository/vulnerabilitiesRepository')
var bodyParser = require('../services/bodyParser');

function addChannel(req, res, channel){
    try{
        return vulnerabilitiesRepository.getOne(channel.vulnerability).then((vulnerability) => {
            channel.vulnerability = vulnerability;
            return chatRepository.addChannel(channel).spread((createdChannel, created) =>{
                if(created){
                    let userIds = [];
                    for (const user of channel.users) {
                        userIds.push(user.id);
                    }
                    return createdChannel.addUsers(userIds).then(() =>{
                        if(channel.vulnerability){
                            return createdChannel.setVulnerability(channel.vulnerability.id).then(() =>{
                                res.writeHead(200);
                                res.end();
                            })
                            .catch((err) =>{
                                errorService.writeErrorToHead(res, err, 400);
                                res.end();
                            });
                        }else{
                            res.writeHead(200);
                            res.end();
                        }
                    })
                    .catch((err) =>{
                        errorService.writeErrorToHead(res, err, 400);
                        res.end();
                    });
                }else{
                    errorService.writeErrorToHead(res, new Error("Такое имя существует"), 400);
                    res.end();
                }
            })
            .catch((err) =>{
                errorService.writeErrorToHead(res, err, 400);
                res.end();
            });
        });
    }catch(err){
        res.write(err.message);
        res.end('fail');
    }
}

function getChannel(id){
    return chatRepository.getById(id);
}

function getChannels(params, user){
    return chatRepository.getChannels(params, user);
}

function deleteChannel(id){
    return chatRepository.deleteChannel(id);
}

module.exports = {
    getChannel: getChannel,
    addChannel: addChannel,
    getChannels: getChannels,
    deleteChannel: deleteChannel
}