var connectionManager = require('../connectionManager');
var sequelizeLib = require('sequelize');
var sequelize = connectionManager.sequelize;
var DataTypes = sequelizeLib.DataTypes;

const Message = sequelize.define('message', { 
    id: { 
        type: DataTypes.UUID, 
        primaryKey: true,
        defaultValue: DataTypes.UUIDV1
    },
    text: DataTypes.TEXT,
    // Timestamps
    updatedAt: DataTypes.DATE,
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
    //many to one channel
    //many to one user
}); 

module.exports = Message;