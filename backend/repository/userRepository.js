var User = require('../models/user');
var defaultSettings = require('../config');
var { Op } = require('sequelize');

function findById(id){
    return User.findById(id);
}

function getUsers(params){
    const limit = params.limit && params.limit!="null" ? params.limit: defaultSettings.defaultDataLimit;
    const offset = params.offset && params.offset!="null" ? params.offset: defaultSettings.defaultOffset;
    let filter = {};
    delete params.limit;
    delete params.offset;
    if(params != {}){
        for(var property in params){
            if(params[property] == "") continue;
            if(parseInt(params[property]) != NaN){
                filter[property] = {
                    [Op.eq]: `${params[property]}`
                }
            }else{
                filter[property] = {
                    [Op.iLike]: `%${params[property]}%`
                }
            }
        }
    }
    return User.findAndCountAll({
        limit, 
        offset, 
        where: filter,
        attributes: {
            exclude: ['password']
        }
    });
}

function update(params){
    let newData = {};
    let id;
    if(params != null){
        id = params.id;
        delete params.id;
        for(var property in params.user){
            if(params[property] == "") continue;
            newData[property] = params.user[property];
        }
        // нельзя сменить роль админа
        if(id == 1){
            newData["accessLevel"] = 0;
        }
    }
    return User.update(newData, {
        where: {
            id: id
        }
    })
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

function deleteUser(id){
    return User.destroy({
        where: {
            'id': id
        }
    });
}

module.exports = {
    createUser: createUser,
    findById: findById,
    getUsers: getUsers,
    get:get,
    deleteUser: deleteUser,
    update: update
}