var dataController = require('./controllers/dataController');
var connectionController = require('./controllers/connectionController');
var homeController = require('./controllers/homeController');
var authController = require('./controllers/authController');
var userController = require('./controllers/userController');
var chatController = require('./controllers/chatController');
var messageController = require('./controllers/messageController');
const querystring = require('querystring');

module.exports = {
    defineRoutes(req, res){
        const indexOfParams = req.url.indexOf('?');
        let params;
        let url;
        if(indexOfParams != -1){
            params = querystring.parse(req.url.substring(indexOfParams+1));
            url = req.url.substring(0, indexOfParams);
        }else{
            url = req.url;
        }
        const httpVerb = req.method;
   
        if(httpVerb == 'GET'){
            switch (url){
                case '/api/message/getMessages':
                    messageController.getMessages(req, res, params);
                    break;
                case '/api/data/getById':
                    dataController.getById(req, res, params);
                    break;
                case '/api/data/getData':
                    dataController.getData(req, res, params);
                    break;
                case '/api/user/getById':
                    userController.getById(req, res, params);
                    break;
                case '/api/user/getUserFromToken':
                    userController.getUserFromToken(req, res);
                    break;
                case '/api/user/getUsers':
                    userController.getUsers(req, res, params);
                    break;
                case '/api/chat/getChannels':
                    chatController.getChannels(req, res, params);
                    break;
                case '/public/app.js':
                    homeController.app(req, res);
                    break;
                case '/public/logo.jpg':
                    homeController.logo(req, res);
                    break;
                case '/public/edit.jpg':
                    homeController.edit(req, res);
                    break;
                case '/public/trash.jpg':
                    homeController.trash(req, res);
                    break;
                case '/favicon.ico':
                    homeController.icon(req, res);
                    break;
                default:
                    homeController.home(req, res); 
                    break;
            }
        }
        if(httpVerb == 'POST'){
            switch(url){
                case '/api/auth':
                    authController.authorizeUser(req, res);
                    break;
                case '/api/register':
                    userController.registerNewUser(req, res);
                    break;
                case '/api/connectToDb':
                    connectionController.connectToDb(req,res);
                    break;
                case '/api/user/add':
                    userController.createUser(req, res);
                    break;
                case '/api/user/update':
                    userController.updateUser(req, res);
                    break;
                case '/api/channel/add':
                    chatController.addChannel(req, res);
                    break;
                default:
                    res.end();
                    break;
            }
        }
        if(httpVerb == 'DELETE'){
            switch(url){
                case '/api/user/delete':
                    userController.deleteUser(req, res, params);
                    break;
                case '/api/channel/delete':
                    chatController.deleteChannel(req, res, params);
                    break;
                default:
                    res.end();
                    break;
            }
        }
        if(httpVerb == 'PUT'){
            res.end();
        }
    }
}