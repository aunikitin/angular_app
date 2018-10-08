var path = require('path');
var fileSystem = require('fs');
var appPath = 'F:\\University\\5 курс\\Борисенко 5 курс\\superProtectedApp'

function home(req, res){
    var filePath = path.resolve(appPath, 'index.html');
    var stat = fileSystem.statSync(filePath);

    res.writeHead(200, {
        'Conetent-Type': 'text/html',
        //'Content-Length': stat.size
    })
    var readStream = fileSystem.createReadStream(filePath);
    readStream.pipe(res);
    //return res.sendFile(path.resolve(process.cwd(), 'index.html'));
}

function app(req, res){
    var filePath = appPath + '\\public\\app.js';
    var stat = fileSystem.statSync(filePath);

    res.writeHead(200, {
        //'Conetent-Type': 'application/json',
        //'Content-Length': stat.size
    })
    var readStream = fileSystem.createReadStream(filePath);
    readStream.pipe(res);
}

module.exports = {
    home: home,
    app: app
}