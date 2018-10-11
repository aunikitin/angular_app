var userRepository = require('../repository/userRepository');

function createUser(req, res, parentCallback){
    var body = '';
    req.on('data', chunk => {
        body += chunk.toString(); // convert Buffer to string
    });
    req.on('end', () => {
        var newUser = JSON.parse(body);
        if(!newUser.login){
            parentCallback(new Error('Необходимо ввести логин'));
        }
        if(!newUser.password){
            parentCallback(new Error('Необходимо ввести пароль'));
        }
        userRepository.createUser(newUser)
            .spread((user, created) => {
                if(created){
                    var response = authService.getToken(user);
                    parentCallback(null, response);
                } else {
                    parentCallback(new Error('Введите другое имя пользователя'));
                }
            });
    });
}

module.exports = {
    createUser: createUser
}