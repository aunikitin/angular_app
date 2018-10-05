var connectionManager = require('../models/connectionManager');

/** '/api/connectToDb' */
function connectToDb(req, res){
    var response = {};
    if(!connectionManager.exist){
        var connection = connectionManager();
        connection.connect();
    }
    response = {
        status: 'success',
        data: "U've been connected to db"
    }
    res.send(response);
}

module.exports = {
    connectToDb: connectToDb
};