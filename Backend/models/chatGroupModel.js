import { DataTypes } from 'sequelize';
import db from '../config/Database.js';
import EmployeeData from './EmployeeDataModel.js'; // Import the EmployeeData model
import Message from './messageModel.js'; // Import the Message model

const ChatGroup = db.define('chat_group', {
    group_id: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    group_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    department: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

// Define associations
ChatGroup.belongsToMany(EmployeeData, { through: 'GroupMembers', foreignKey: 'group_id' });
EmployeeData.belongsToMany(ChatGroup, { through: 'GroupMembers', foreignKey: 'employee_id' });

ChatGroup.hasMany(Message, { foreignKey: 'group_id' });
Message.belongsTo(ChatGroup, { foreignKey: 'group_id' });

export default ChatGroup;