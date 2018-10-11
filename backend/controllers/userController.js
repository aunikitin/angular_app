var userService = require('../services/userService');
var authService = require('../services/authService');

function registerNewUser(req,res){
    try{
        const callback = (err, result) =>{
            if(err){
                throw err;
            }else{
                res.write(JSON.stringify(result));
                res.end();
            }
        }
        userService.createUser(req, res, callback);
    }catch(err){
        res.write(err.message);
        res.end('fail');
    }
}

function createUser(req, res){
    try{
        const callback = (err, result) =>{
            if(err){
                throw err;
            }else{
                res.write(JSON.stringify(result));
                res.end();
            }
        }
        authService.identifyUser(req, res, callback);
    }catch(err){
        res.write(err.message);
        res.end('fail');
    }
}

module.exports = {
    registerNewUser: registerNewUser,
    createUser: createUser
}