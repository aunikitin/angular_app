var vulnerabilitiesRepository = require('../repository/vulnerabilitiesRepository');
var authService = require('../services/authService');

/** '/api/getById' */
function getById(req, res, params){
    const callback = (err, result) =>{
        try{
            if(err){
                throw err;
            }
            const id = params.id;
            vulnerabilitiesRepository.findById(id).then((vulnerability) =>{
                res.write(JSON.stringify(vulnerability));
                res.end();
            });
        }
        catch(err){
            res.writeHead(401, {'Content-Type': 'text'});
            res.write(JSON.stringify(err.message), 'utf-8');
            res.end();
        }
    }
    authService.getUserFromToken(req, res, callback);
}

/** '/api/getData' */
function getData(req, res, params){
        const callback = (err, result) =>{
        try{
            if(err){
                throw err;
            }
            vulnerabilitiesRepository.getData(params).then(vulnerabilities =>{
                res.write(JSON.stringify(vulnerabilities));
                res.end();
            });
        }
        catch(err){
            res.writeHead(401, {'Content-Type': 'text'});
            res.write(JSON.stringify(err.message), 'utf-8');
            res.end();
        }
    }
    authService.getUserFromToken(req, res, callback);     
}

module.exports = {
    getById: getById,
    getData: getData
};