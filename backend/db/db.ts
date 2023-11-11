import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const db = new Sequelize(`${process.env.DB_NAME}`, `${process.env.DB_USER}`, `${process.env.DB_PWD}`, {
    host: 'localhost', 
    dialect: 'postgres', 
    port: 5432,
});

export default db; 