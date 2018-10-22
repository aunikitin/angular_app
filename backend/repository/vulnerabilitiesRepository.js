var Vulnerability = require('../models/vulnerability');
var defaultSettings = require('../config');
var { Op } = require('sequelize');

function findById(id){
    return Vulnerability.findById(id);
}

function getOne(params){
    const filterObject = {
        identifier: {
            [Op.iLike]: `%${params}%`
        }
    };
    return Vulnerability.findOne({where: filterObject});
}

function getData(params){
    const limit = params.limit ? params.limit: defaultSettings.defaultDataLimit;
    const offset = params.offset ? params.offset: defaultSettings.defaultOffset;
    let filter = {};
    delete params.limit;
    delete params.offset;
    if(params != {}){
        for(var property in params){
            if(params[property] == "") continue;
            filter[property] = {
                [Op.iLike]: `%${params[property]}%`
            }
        }
    }
    return Vulnerability.findAndCountAll({limit, offset, where: filter});
}

module.exports = {
    findById: findById,
    getData: getData,
    getOne: getOne
}