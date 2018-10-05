var initRouter = require('./services/routerService');
var dataController = require('./controllers/dataController');
var connectionController = require('./controllers/connectionController');
var homeController = require('./controllers/homeController');

let router = null;

function initRoutes() {
    router.get('/', homeController.home);
    router.get('/api/getAllData', dataController.getAllData);

    router.post('/api/connectToDb', connectionController.connectToDb);
}

module.exports = {
    init(app) {
        router = initRouter(app);

        initRoutes();
    }
};