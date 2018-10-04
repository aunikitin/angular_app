class SequelizeOptions {
    get dialect(){
        return 'postgres';
    }
    
    get host(){
        if(this._host){
            return this._host;
        }
        return '192.168.0.15';
    }
    set host(newValue){
        this._host = newValue;
    }
    
    get port(){
        if(this._port){
            return this._port;
        }
        return '5432';
    }
    set port(newValue){
        this._port = newValue;
    }

    constructor(port, host){
        if(host){
            this._host = host;
        }
        if(port){
            this._port = port;
        }
    }
}

module.exports = SequelizeOptions;