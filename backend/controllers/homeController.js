var path = require('path');

function home(req, res){
    return res.sendFile(path.resolve(process.cwd(), 'index.html'));
}

module.exports = {
    home: home
}