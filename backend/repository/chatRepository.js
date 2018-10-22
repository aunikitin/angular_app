var Channel = require('../models/chat/channel');
var User = require('../models/user');
var Vulnerability = require('../models/vulnerability');
var Message = require('../models/chat/message');
var { Op } = require('sequelize');

function findById(id){
    return Channel.findById(id);
}

function getChannels(params, user){
    let filter = {};
    if(params != {}){
        for(var property in params){
            if(params[property] == "") continue;
            filter[property] = {
                [Op.iLike]: `%${params[property]}%`
            }
        }
    }
    return Channel.findAndCountAll({
        where: filter,
        include: [{
            model: User,
            attributes: {
                exclude: ['password', 'ChannelUser']
            },
            through: { 
                where: {
                    userId: user.id
                }
            }
        },
        {
            model: Vulnerability
        }]
    });
}

function addChannel(channel){
    return Channel.findOrCreate({
        where: {
            name: channel.name
        },
        defaults: {
            name: channel.name
        }
    });
}

function addUsers(createdChannel, channel){
    return createdChannel.addUsers(channel.users);
}

function addVulnerability(createdChannel, channel){
    return createdChannel.addVulnerability(channel.vulnerability);
}

function deleteChannel(id){
    return Channel.destroy({
        where: {
            'id': id
        }
    });
}

function getById(id){
    return Channel.findOne({
        where: { 
            'id': id
        },
        include: [{
            model: User,
            attributes: {
                exclude: ['password', 'ChannelUser']
            }
        },
        {
            model: Message
        }]
    })
}

module.exports = {
    getById: getById,
    addChannel: addChannel,
    addUsers: addUsers,
    addVulnerability: addVulnerability,
    findById: findById,
    getChannels: getChannels,
    deleteChannel: deleteChannel
}