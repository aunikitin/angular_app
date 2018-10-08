var connectionManager = require('../models/connectionManager');

/** '/api/connectToDb' */
function connectToDb(req, res){
    var response = {};
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString(); // convert Buffer to string
    });
    req.on('end', () => {
        const requestBody = JSON.parse(body);
        if(!connectionManager.exist){
            var connection = connectionManager();
            connection.connect();
        }
        response = {
            status: 'success',
            data: "U've been connected to db"
        }
        res.write(JSON.stringify(response));
        res.end();
    });
}

module.exports = {
    connectToDb: connectToDb
};