var User = require('../models/user');
var defaultSettings = require('../config');
var { Op } = require('sequelize');

function findById(id){
    return User.findById(id);
}

function getUsers(params){
    const limit = params.limit ? params.limit: defaultSettings.defaultDataLimit;
    const offset = params.offset ? params.offset: defaultSettings.defaultOffset;
    let filter = {};
    delete params.limit;
    delete params.offset;
    if(params != {}){
        for(var property in params){
            filter[property] = {
                [Op.iLike]: `%${params[property]}%`
            }
        }
    }
    return User.findAndCountAll({limit, offset, where: filter});
}

function createUser(user){
    return User.findOrCreate({
        where: {
            login: user.login
        },
        defaults: {
            login: user.login,
            password: user.password,
            email: user.email,
            accessLevel: user.accessLevel
        }
    });
}

function get(credentials){
    return User.findOne({
        where: { 
            login: credentials.login, 
            password: credentials.password 
        }
    })
}

module.exports = {
    createUser: createUser,
    findById: findById,
    getUsers: getUsers,
    get:get
}