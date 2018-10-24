var Message = require('../models/chat/message');

function saveMessage(message){
    return Message.create({
        text: message.text
    });
}

module.exports = {
    saveMessage: saveMessage
}