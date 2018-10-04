const Sequelize = require('sequelize');
const SequelizeOptions = require('./sequelizeOptions');

class ConnectionManager {
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

    get sequelize(){
        return this._sequelize;
    }
    set sequelize(newValue){
        this._sequelize = newValue;
    }

    constructor(db, username, password, host, port){     
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

    initSequalize(){
        var connectionString = `${this.sequelizeOptions.dialect}://${this.username}:${this.password}@${this.sequelizeOptions.host}:${this.sequelizeOptions.port}/${this.db}`;
        var sequelize = new Sequelize(connectionString, {define: {timestamps: false}});
        this.sequelize = sequelize;
        return this.sequelize;
    }

    connect(){
        var connectionString = `${this.sequelizeOptions.dialect}://${this.username}:${this.password}@${this.sequelizeOptions.host}:${this.sequelizeOptions.port}/${this.db}`;
        var sequelize = new Sequelize(connectionString, {define: {timestamps: false}});
        this.sequalize = sequelize;
        sequelize.authenticate()
            .then(() => console.log('connect to db was successful'))
            .catch(err => console.log('errors with db, my lord: ', err));
    }
}

module.exports = ConnectionManager;