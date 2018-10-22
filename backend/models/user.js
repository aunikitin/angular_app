var connectionManager = require('./connectionManager');
var sequelizeLib = require('sequelize');
var sequelize = connectionManager.sequelize;
var DataTypes = sequelizeLib.DataTypes;

const User = sequelize.define('user', { 
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true,
        autoIncrement: true
    }, 
    login: {
        type:DataTypes.TEXT,
        unique: true
    },
    email: DataTypes.TEXT, 
    password: DataTypes.TEXT,
    accessLevel: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    }
    //many to many channel
    //one to many messages
});

module.exports = User;