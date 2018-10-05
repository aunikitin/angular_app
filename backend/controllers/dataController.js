var Vulnerability = require('../models/vulnerability');
// var dataRepository = require('')

/** '/api/getAllData' */
function getAllData(req, res){
    var vulnerabilities = Vulnerability.findOne().then(vulnerability =>{
        var result = [];
        result.push(vulnerability);
        res.send(result);
    })
}

module.exports = {
    getAllData: getAllData
};