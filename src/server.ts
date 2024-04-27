import mysql, { PoolOptions } from 'mysql2';
import queries from './queries.cjs';

import dotenv, { configDotenv } from 'dotenv'
dotenv.config();

const access: PoolOptions = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
};

const connection = mysql.createPool(access).promise();
console.log(queries.q.getLine);

const result = await connection.query(queries.q.getLine);
console.log(result[0]);

connection.end();


