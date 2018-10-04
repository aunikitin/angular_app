var ConnectionManager = require('../models/connectionManager');

/** '/api/connectToDb' */
function connectToDb(req, res){
    var connection = new ConnectionManager();
    connection.connect();
    response = {
        status: 'success',
        data: "U've been connected to db"
    }
    res.send(response);
}

module.exports = {
    connectToDb: connectToDb
};