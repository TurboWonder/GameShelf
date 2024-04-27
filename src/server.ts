import mysql, { PoolOptions } from 'mysql2';
import * as queries from './queries.js';


import dotenv, { configDotenv } from 'dotenv';
dotenv.config();

const access: PoolOptions = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
};

const connection = mysql.createPool(access).promise();

export async function getLines() {
    const [rows] = await connection.query(queries.getLine);
    return rows;
}

export async function endConnection() {
    await connection.end();
}

