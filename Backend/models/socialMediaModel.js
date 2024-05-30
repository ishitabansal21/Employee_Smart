import { Sequelize } from 'sequelize';
import db from '../config/database.js';
import EmployeeData from './EmployeeDataModel.js';

const { DataTypes } = Sequelize;

const Post = db.define('post', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    media_url: {
        type: DataTypes.STRING,
        allowNull: true
    },
    // Add foreign key to associate posts with employees
    employeeId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    employeeName: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    employeePhoto: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    likeCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
}, {
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

const Comment = db.define('comment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    // Add foreign key to associate comments with posts
    postId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    employeeId: {
        type: DataTypes.UUID,
        allowNull: false
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

const Like = db.define('like', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    // Add foreign key to associate likes with posts
    postId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    employeeId: {
        type: DataTypes.UUID,
        allowNull: false
    },
}, {
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

// Define associations
Post.hasMany(Comment);
Comment.belongsTo(Post);

Post.hasMany(Like);
Like.belongsTo(Post);

// Associate posts, comments, and likes with employees
Post.belongsTo(EmployeeData);
Comment.belongsTo(EmployeeData);
Like.belongsTo(EmployeeData);

export { Post, Comment, Like };
// import { Sequelize } from 'sequelize';
// import db from '../config/Database.js';
// import EmployeeData from './EmployeeDataModel.js';

// const { DataTypes } = Sequelize;

// const Post = db.define('post', {
//     id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true
//     },
//     content: {
//         type: DataTypes.TEXT,
//         allowNull: false
//     },
//     media_url: {
//         type: DataTypes.STRING,
//         allowNull: true
//     },
//     // Add foreign key to associate posts with employees
//     employeeId: {
//         type: DataTypes.UUID,
//         allowNull: false
//     },
//     likeCount: {
//         type: DataTypes.INTEGER,
//         defaultValue: 0
//     },
// }, {
//     freezeTableName: true,
//     timestamps: true,
//     createdAt: 'created_at',
//     updatedAt: 'updated_at'
// });

// const Comment = db.define('comment', {
//     id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true
//     },
//     content: {
//         type: DataTypes.TEXT,
//         allowNull: false
//     },
//     // Add foreign key to associate comments with posts
//     postId: {
//         type: DataTypes.INTEGER,
//         allowNull: false
//     },
//     employeeId: {
//         type: DataTypes.UUID,
//         allowNull: false
//     },
// }, {
//     freezeTableName: true,
//     timestamps: true,
//     createdAt: 'created_at',
//     updatedAt: 'updated_at'
// });

// const Like = db.define('like', {
//     id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true
//     },
//     // Add foreign key to associate likes with posts
//     postId: {
//         type: DataTypes.INTEGER,
//         allowNull: false
//     },
//     employeeId: {
//         type: DataTypes.UUID,
//         allowNull: false
//     },
// }, {
//     freezeTableName: true,
//     timestamps: true,
//     createdAt: 'created_at',
//     updatedAt: 'updated_at'
// });

// // Define associations
// Post.hasMany(Comment);
// Comment.belongsTo(Post);

// Post.hasMany(Like);
// Like.belongsTo(Post);

// // Associate posts, comments, and likes with employees
// Post.belongsTo(EmployeeData);
// Comment.belongsTo(EmployeeData);
// Like.belongsTo(EmployeeData);

// export { Post, Comment, Like };
