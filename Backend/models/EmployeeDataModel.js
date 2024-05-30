// import { Sequelize } from 'sequelize';
// import db from '../config/Database.js';

// const { DataTypes } = Sequelize;

// const EmployeeData = db.define('employee_data', {
//     employee_id: {
//         type: DataTypes.STRING,
//         defaultValue: DataTypes.UUIDV4,
//         allowNull: false,
//         validate: {
//             notEmpty: true
//         }
//     },
//     nik: {
//         type: DataTypes.STRING(16),
//         allowNull: false
//     },
//     employee_name: {
//         type: DataTypes.STRING(100),
//         allowNull: false
//     },
//     username: {
//         type: DataTypes.STRING(120),
//         allowNull: false
//     },
//     password: {
//         type: DataTypes.STRING
//     },
//     gender: {
//         type: DataTypes.STRING(15),
//         allowNull: false
//     },
//     position: {
//         type: DataTypes.STRING(50),
//         allowNull: false
//     },
//     join_date: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     status: {
//         type: DataTypes.STRING(50),
//         allowNull: false
//     },
//     photo: {
//         type: DataTypes.STRING(100),
//         allowNull: false
//     },
//     url: DataTypes.STRING,
//     access_rights: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         validate: {
//             notEmpty: true
//         }
//     }
// }, {
//     freezeTableName: true,
//     timestamps: true,
//     createdAt: 'created_at',
//     updatedAt: 'updated_at'
// });

// export default EmployeeData;

import { Sequelize } from 'sequelize';
import db from '../config/Database.js';

const { DataTypes } = Sequelize;

const EmployeeData = db.define('employee_data', {
    employee_id: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    nik: {
        type: DataTypes.STRING(16),
        allowNull: false
    },
    employee_name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    username: {
        type: DataTypes.STRING(120),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING
    },
    gender: {
        type: DataTypes.STRING(15),
        allowNull: false
    },
    position: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    department: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    join_date: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    photo: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING, // Add email field
        allowNull: false
    },
    url: DataTypes.STRING,
    access_rights: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    invite_accepted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false // Default value for invite_accepted
    }
}, {
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

export default EmployeeData;
