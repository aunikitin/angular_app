var errorService = require('./errorService');
var channelRepository = require('../repository/channelRepository');
var vulnerabilitiesRepository = require('../repository/vulnerabilitiesRepository')

function addChannel(req, res, channel){
    try{
        return vulnerabilitiesRepository.getOne(channel.vulnerability).then((vulnerability) => {
            channel.vulnerability = vulnerability;
            return channelRepository.addChannel(channel).spread((createdChannel, created) =>{
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
    return channelRepository.getById(id);
}

function getChannels(params){
    return channelRepository.getChannels(params);
}

function deleteChannel(id){
    return channelRepository.deleteChannel(id);
}

module.exports = {
    getChannel: getChannel,
    addChannel: addChannel,
    getChannels: getChannels,
    deleteChannel: deleteChannel
}