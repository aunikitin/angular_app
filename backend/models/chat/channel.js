var connectionManager = require('../connectionManager');
var sequelizeLib = require('sequelize');
var sequelize = connectionManager.sequelize;
var DataTypes = sequelizeLib.DataTypes;

const Channel = sequelize.define('channel', { 
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true
    },
    // Timestamps
    updatedAt: DataTypes.DATE,
    createdAt: DataTypes.DATE
    //Many to many user
    //Many to one vulnerability
    //One to many messages
});

module.exports = Channel;