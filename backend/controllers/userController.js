var userService = require('../services/userService');
var authService = require('../services/authService');
var errorService = require('../services/errorService');
var userRepository = require('../repository/userRepository');

function registerNewUser(req,res){
    try{
        const callback = (err, result) =>{
            if(err){
                errorService.writeErrorToHead(res, err, 403);
                res.end();
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
                errorService.writeErrorToHead(res, err, 403);
                res.end();
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

function getUsers(req, res, params){
    const callback = (err, user) =>{
        if(err){
            errorService.writeErrorToHead(res, err, 401);
            res.end();
        }else{
            if(user.accessLevel >= 0){
                userRepository.getUsers(params).then(data =>{
                    res.write(JSON.stringify(data));
                    res.end();
                });
            }else{
                errorService.writeErrorToHead(res, err, 401);
                res.end();
            }
        }
    }
    authService.getUserFromToken(req, res, callback);
}

module.exports = {
    registerNewUser: registerNewUser,
    createUser: createUser,
    getUsers: getUsers
}