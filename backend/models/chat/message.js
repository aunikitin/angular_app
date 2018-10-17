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
    channel_id: {
        allowNull: false,
        type: DataTypes.INTEGER
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

module.exports = Message;