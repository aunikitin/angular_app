var authService = require('../services/authService');
var errorService = require('../services/errorService');

function authorizeUser(req, res){
    try{
        const callback = (err, result) =>{
            if(err){
                errorService.writeErrorToHead(res, err, 401);
                res.end()
            }else{
                res.write(JSON.stringify(result));
                res.end();
            }
        }
        authService.authorizeUser(req, res, callback);
    }catch(err){
        res.write(err.message);
        res.end('fail');
    }
}

module.exports = {
    authorizeUser: authorizeUser
}