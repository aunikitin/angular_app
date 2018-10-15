var dataController = require('./controllers/dataController');
var connectionController = require('./controllers/connectionController');
var homeController = require('./controllers/homeController');
var authController = require('./controllers/authController');
var userController = require('./controllers/userController');
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
                case '/api/data/getById':
                    dataController.getById(req, res, params);
                    break;
                case '/api/data/getData':
                    dataController.getData(req, res, params);
                    break;
                case '/api/user/getById':
                    userController.getById(req, res, params);
                    break;
                case '/api/user/getUsers':
                    userController.getUsers(req, res, params);
                    break;
                case '/public/app.js':
                    homeController.app(req, res);
                    break;
                case '/public/logo.jpg':
                    homeController.logo(req, res);
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
                case '/api/newUser':
                    userController.createUser(req, res);
                    break;
                case '/api/register':
                    userController.registerNewUser(req, res);
                    break;
                case '/api/connectToDb':
                    connectionController.connectToDb(req,res);
                    break;
                default:
                    res.end();
                    break;
            }
        }
    }
}