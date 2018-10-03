var ConnectionManager = require('../db/connectionManager');

function connectToDb(req, res){
    var connection = ConnectionManager().init();
    connection.connect();
    res.sendFile('../../index.html');
}

module.exports = {connectToDb};