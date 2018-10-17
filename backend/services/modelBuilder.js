var User = require('../models/user');
var Channel = require('../models/chat/channel');
var Message = require('../models/chat/message');
var Vulnerability = require('../models/vulnerability');

class ModelBuilder {
    constructor(){
        // // sourceModel.hasOne(targetModel)  
        // // sourceModel.hasMany(targetModel)  
        // // targetModel.belongsTo(sourceTable)  
    }

    buildModels(){
        Message.belongsTo(Channel);
        Message.belongsTo(User);
        Channel.hasMany(Message);  
        Channel.belongsTo(User);
        User.hasMany(Channel);
    }
}

module.exports = ModelBuilder;