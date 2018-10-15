function parseBody(req, callback){
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString(); // convert Buffer to string
    });
    req.on('end', () => {
        var result = JSON.parse(body);
        callback(result);
    })
}

module.exports = {
    parseBody: parseBody
}