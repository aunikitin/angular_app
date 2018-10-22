var authService = require('../services/authService');
var errorService = require('../services/errorService');
var chatService = require('../services/chatService');

function getMessages(req, res, params){
    const callback = (err, user) =>{
        if(err){
            throw err;
        }
        const id = params.id;
        chatService.getChannel(id).then((channel) => {
            let canReadMessages = false;
            for (const userInChannel of channel.users) {
                canReadMessages = canReadMessages || userInChannel.id == user.id;
            }
            if(canReadMessages){
                res.write(JSON.stringify(channel.messages));
                res.end();
            }else{
                errorService.writeErrorToHead(res, new Error("Вы не являетесь участником данной комнаты"), 401);
                res.end();
            }
        })
        .catch((err) => {
            errorService.writeErrorToHead(res, err, 400);
            res.end();
        })
    }
    authService.getUserFromToken(req, res, callback);
}

module.exports = {
    getMessages: getMessages
}