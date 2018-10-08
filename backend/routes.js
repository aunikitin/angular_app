var dataController = require('./controllers/dataController');
var connectionController = require('./controllers/connectionController');
var homeController = require('./controllers/homeController');
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
            switch (url) {
                case "/":
                    homeController.home(req, res); 
                    break;
                case '/public/app.js':
                    homeController.app(req, res);
                    break;
                case '/api/getById':
                    dataController.getById(req, res, params);
                    break;
                case '/api/getData':
                    dataController.getData(req, res, params);
                    break;
                default:
                    res.end();
                    break;
            }
        }
        if(httpVerb == 'POST'){
            switch(url){
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