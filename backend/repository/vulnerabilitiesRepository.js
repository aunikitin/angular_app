var Vulnerability = require('../models/vulnerability');
var defaultSettings = require('../config');
var { Op } = require('sequelize');

function findById(id){
    return Vulnerability.findById(id);
}

function getData(params){
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
    return Vulnerability.findAndCountAll({limit, offset, where: filter});
}

module.exports = {
    findById: findById,
    getData: getData
}