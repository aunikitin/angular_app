var jwt = require('jsonwebtoken');
var defaultOptions = require('../config');
var userRepository = require('../repository/userRepository');

function getToken(user){
    var token = jwt.sign({ 
        id: user.id 
    }, 
    defaultOptions.secret, 
    {
        expiresIn : defaultOptions.expiresIn
    });
    var response = {
        auth: true,
        token: token
    }
    return response;
}

function authorizeUser(req, res, parentCallback){
    var body = '';
    req.on('data', chunk => {
        body += chunk.toString(); // convert Buffer to string
    });
    req.on('end', () => {
        var credentials = JSON.parse(body);
        if(!credentials.login){
            parentCallback(new Error('Необходимо ввести логин'));
            return;
        }
        if(!credentials.password){
            parentCallback(new Error('Необходимо ввести пароль'));
            return;
        }
        userRepository.get(credentials).then(user =>{
            if(user == null){
                parentCallback(new Error('Неверный логин/пароль'));
                return;
            }else{
                var result = getToken(user);
                result.user = {
                    login: user.login,
                    email: user.email,
                    accessLevel: user.accessLevel,
                    channels: user.channels
                };
                parentCallback(null, result);
            }
        });
    });
}

function getUserFromToken(req, res, parentCallback){
    var token = req.headers['x-access-token'];
    if (!token) {
        parentCallback(new Error('Токен отсутствует'));
        return;
    };
    var callback = (err, decoded) => {
        if (err) {
            parentCallback(new Error('Токен истёк'));
            return;
        } else {
            userRepository.findById(decoded.id).then(user =>{
                if(!user){
                    parentCallback(new Error('Пользователь не идентифицирован'));
                    return;
                }
                parentCallback(null, user);
            });
        }
    }
    verify(token, callback);
}

function identifyUser(req, res, parentCallback){
    var token = req.headers['x-access-token'];
    if (!token) {
        parentCallback(new Error('Токен отсутствует'));
        return;
    };
    var callback = (err, decoded) => {
        if (err) {
            parentCallback(new Error('Токен истёк'));
            return;
        } else {
            userRepository.findById(decoded.id).then(user =>{
                if(!user){
                    parentCallback(new Error('Пользователь не идентифицирован'));
                    return;
                }
                if(user.accessLevel < 1){
                    userService.createUser(req, res)
                    .spread((user, created) => {
                        if(created){
                            parentCallback(null, user);
                        } else {
                            parentCallback(new Error('Введите другое имя пользователя'));
                            return;
                        }
                    });
                } else {
                    parentCallback(new Error('Вы не являетесь администратором'));
                    return;
                }
            });
        }
    }
    verify(token, callback);
}

function verify(token, callback){
    jwt.verify(token, defaultOptions.secret, callback);
}

module.exports = {
    getToken: getToken,
    identifyUser: identifyUser,
    authorizeUser: authorizeUser,
    getUserFromToken: getUserFromToken
}