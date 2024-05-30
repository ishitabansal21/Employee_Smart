// import { Sequelize } from 'sequelize';
// import db from '../config/Database.js';
// import EmployeeData from './EmployeeDataModel.js';

// const { DataTypes } = Sequelize;

// const JobData = db.define('job_data', {
//     job_id: {
//         type: DataTypes.STRING,
//         defaultValue: DataTypes.UUIDV4,
//         allowNull: false,
//         validate: {
//             notEmpty: true
//         }
//     },
//     position: {                      // job_name changed to position
//         type: DataTypes.STRING(120),
//         allowNull: false
//     },
//     base_salary: {
//         type: DataTypes.INTEGER(50),
//         allowNull: false
//     },
//     transport_allowance: {
//         type: DataTypes.INTEGER(50),
//         allowNull: false
//     },
//     meal_allowance: {
//         type: DataTypes.INTEGER(50)
//     },
//     user_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         validate: {
//             notEmpty: true
//         }
//     },
//     department_id: {
//         type: DataTypes.INTEGER, // Add department_id field
//         allowNull: false
//     }
// }, {
//     freezeTableName: true,
//     timestamps: true,
//     createdAt: 'created_at',
//     updatedAt: 'updated_at'
// });


// EmployeeData.hasMany(JobData);
// JobData.belongsTo(EmployeeData, { foreignKey: 'userId' });

// export default JobData;


import { Sequelize } from 'sequelize';
import db from '../config/Database.js';
import EmployeeData from './EmployeeDataModel.js';

const { DataTypes } = Sequelize;

const JobData = db.define('job_data', {
    job_id: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    department: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    base_salary: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    transport_allowance: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    meal_allowance: {
        type: DataTypes.INTEGER
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
}, {
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

EmployeeData.hasMany(JobData, { foreignKey: 'user_id' });
JobData.belongsTo(EmployeeData, { foreignKey: 'user_id' });

export default JobData;
