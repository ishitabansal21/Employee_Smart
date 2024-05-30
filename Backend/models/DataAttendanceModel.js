import { Sequelize } from 'sequelize';
import db from '../config/Database.js';

const { DataTypes } = Sequelize;

const AttendanceData = db.define('attendance_data', {
    id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    month: {
        type: DataTypes.STRING(15),
        allowNull: false
    },
    // year: {
    //     type: DataTypes.INTEGER(4), // Assuming you store year as an integer
    //     allowNull: false,
    // },
    nik: {
        type: DataTypes.STRING(16),
        allowNull: false
    },
    employee_name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    gender: {
        type: DataTypes.STRING(20)
    },
    // position: {                     // job_name changed to position
    //     type: DataTypes.STRING(50)
    // },
    department: {
        type: DataTypes.STRING(50)
    },
    present: {
        type: DataTypes.INTEGER(11)
    },
    sick: {
        type: DataTypes.INTEGER(11)
    },
    absent: {
        type: DataTypes.INTEGER(11)
    },
}, {
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

export default AttendanceData;