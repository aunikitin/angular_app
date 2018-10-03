var ConnectionManager = require('../db/connectionManager');
var express = require('express');
var router = express.Router();

/** '/api/connectToDb' */
function connectToDb(req, res){
    var connection = new ConnectionManager();
    connection.connect();
    res.sendSrarus(200);
}

router.post('/api/connectToDb', connectToDb);

module.exports = router;