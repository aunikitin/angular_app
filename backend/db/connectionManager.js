const Sequelize = require('sequelize');
const SequelizeOptions = require('./sequelizeOptions');

class ConnectionManager {
    get Instance(){
        return this._Instance;
    }

    get db(){
        if(this._db){
            return this._db;
        }
        return 'testdb';
    }
    set db(newValue){
        this._db = newValue;
    }

    get username(){
        if(this._username){
            return this._username;
        }
        return 'postgres';
    }
    set username(newValue){
        this._username = newValue;
    }

    get password(){
        if(this._password){
            return this._password;
        }
        return '12345';
    }
    set password(newValue){
        this._password = newValue;
    }

    get sequelizeOptions(){
        return this._sequelizeOptions;
    }
    set sequelizeOptions(settings){
        this._sequelizeOptions = new SequelizeOptions(settings.port, settings.host);
    }

    constructor(db, username, password, host, port){
        if(this._Instance){
            throw new Exception('Instance exist. Use Instance().');
        }
        
        if(db){
            this._db = db;
        }
        if(username){
            this._username = username;
        }
        if(password){
            this._password = password;
        }
        this.sequelizeOptions = {port, host};

    }

    connect(){
        var sequelize = new Sequelize(this.db, this.username, this.password, this.sequelizeOptions);
        sequelize.authenticate()
            .then(() => console.log('connect to db was successful'))
            .catch(err => console.log('errors with db, my lord: ', err));
    }

    init(db, username, password, host, port){
        if(this._Instance){
            throw new Exception('Instance exist. Use Instance().');
        }else{
            this._Instance = new ConnectionManager(db, username, password, host, port);
        }
    }
}

module.exports = ConnectionManager;