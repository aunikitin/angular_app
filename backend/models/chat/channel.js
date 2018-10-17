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
    user_id: {
        type: DataTypes.INTEGER
    },
    // Timestamps
    updatedAt: DataTypes.DATE,
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false
    }
});

module.exports = Channel;