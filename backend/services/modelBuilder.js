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
        Message.Channel = Message.belongsTo(Channel);
        Channel.Messages = Channel.hasMany(Message);

        Message.User = Message.belongsTo(User);
        User.Messages = User.hasMany(Message);

        Channel.Vulnerability = Channel.belongsTo(Vulnerability);
        Vulnerability.Channels = Vulnerability.hasMany(Channel);

        Channel.Users = Channel.belongsToMany(User, {through: "ChannelUser"});
        User.Channels = User.belongsToMany(Channel, {through: "ChannelUser"});
    }
}

module.exports = ModelBuilder;