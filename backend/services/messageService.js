var authService = require('./authService');
var messageRepository = require('../repository/messageRepository')

function saveMessage(msgObject){
    try{
        var token = msgObject['x-access-token'];
        return new Promise((resolved, reject) => {
            const callback = (err, user) => {
                if(err){
                    reject(err);
                }else{
                    if(user.login == msgObject.message.user.login){
                        messageRepository.saveMessage(msgObject.message).then(message => {
                            message.setUser(user.id).then(() => {
                                message.setChannel(msgObject.message.channel.id).then(() =>{
                                    resolved(message.createdAt);
                                });
                            })
                            .catch(err => {
                                reject(err);
                            });
                        })
                        .catch(err => {
                            reject(err);
                        });
                    }else{
                        reject(new Error('Текущий пользователь не соответствует отправителю сообщения'));
                    }
                }
            }
            authService.getUserFromToken(null, null, callback, token);
        });
    }
    catch(err){

    }
}

module.exports = {
    saveMessage: saveMessage
}