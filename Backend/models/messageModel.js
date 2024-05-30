import { DataTypes } from 'sequelize';
import db from '../config/database.js';
import EmployeeData from './EmployeeDataModel.js';
// import Chat from './chatGroupModel.js';

const Message = db.define('message', {
    message_id: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    sender_id: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    employeeName: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    employeePhoto: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
}, {
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

// Define associations
Message.belongsTo(EmployeeData);

export default Message;