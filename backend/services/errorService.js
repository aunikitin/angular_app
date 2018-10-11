function writeErrorToHead(res, err, code){
    res.writeHead(code, {'Content-Type': 'text'});
    res.write(JSON.stringify(err.message), 'utf-8');
}

module.exports = {
    writeErrorToHead
}