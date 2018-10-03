var express = require('express');
var router = express.Router();

/** '/api/getAllData' */
function getAllData(req, res){
    var connection = new ConnectionManager();
    connection.connect();
    res.sendSrarus(200);
}

router.post('/api/connectToDb', connectToDb);

module.exports = router;