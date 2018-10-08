var vulnerabilitiesRepository = require('../repository/vulnerabilitiesRepository');

/** '/api/getById' */
function getById(req, res, params){
    const id = params.id;
    vulnerabilitiesRepository.findById(id).then((vulnerability) =>{
        res.write(JSON.stringify(vulnerability));
        res.end();
    });
}

/** '/api/getData' */
function getData(req, res, params){
    vulnerabilitiesRepository.getData(params).then(vulnerabilities =>{
        res.write(JSON.stringify(vulnerabilities));
        res.end();
    });       
}

module.exports = {
    getById: getById,
    getData: getData
};