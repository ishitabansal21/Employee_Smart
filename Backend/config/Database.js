
// db.js
import { Sequelize } from 'sequelize';

const db = new Sequelize('employeeportal', 'root', 'ishita123', {
    host: 'localhost',
    dialect: 'mysql'
});

db.sync({ alter: true })
    .then(() => {
        console.log('Models synced with the database');
    })
    .catch((error) => {
        console.error('Error syncing models:', error);
    });

export default db;
