var userService = require('../services/userService');
var authService = require('../services/authService');
var errorService = require('../services/errorService');
var userRepository = require('../repository/userRepository');
var bodyParser = require('../services/bodyParser');

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
        const callback = (err, user) =>{
            if(err){
                errorService.writeErrorToHead(res, err, 401);
                res.end();
            }else{
                const afterParseBody = (body) => {
                    if(user.accessLevel < 1){
                        userRepository.createUser(body).then(() =>{
                            res.writeHead(200);
                            res.end();
                        });
                    }else{
                        errorService.writeErrorToHead(res, err, 401);
                        res.end();
                    }
                }
                bodyParser.parseBody(req, afterParseBody);
            }
        }
        authService.getUserFromToken(req, res, callback);
    }catch(err){
        res.write(err.message);
        res.end('fail');
    }
}

function updateUser(req, res){
    try{
        const callback = (err, user) =>{
            if(err){
                errorService.writeErrorToHead(res, err, 401);
                res.end();
            }else{
                const afterParseBody = (body) => {
                    if(user.accessLevel < 1){
                        userRepository.update(body).then(() =>{
                            res.writeHead(200);
                            res.end();
                        });
                    }else{
                        errorService.writeErrorToHead(res, err, 401);
                        res.end();
                    }
                }
                bodyParser.parseBody(req, afterParseBody);
            }
        }
        authService.getUserFromToken(req, res, callback);
    }catch(err){

    }
}

function getUsers(req, res, params){
    const callback = (err, user) =>{
        if(err){
            errorService.writeErrorToHead(res, err, 401);
            res.end();
        }else{
            if(user.accessLevel < 1){
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

function deleteUser(req, res, params){
    const callback = (err, user) =>{
        if(err){
            errorService.writeErrorToHead(res, err, 401);
            res.end();
        }else{
            if(user.accessLevel < 1){
                const id = params.id;
                if(id != 1){
                    userRepository.deleteUser(id).then(() =>{
                        res.writeHead(200);
                        res.end();
                    });
                }else{
                    errorService.writeErrorToHead(res, new Error('Нельзя удалить администратора'), 403);
                    res.end();
                }
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
    getUsers: getUsers,
    deleteUser: deleteUser,
    updateUser: updateUser
}