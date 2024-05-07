import mysql, { PoolOptions } from 'mysql2';
import * as queries from './queries.js';
import dotenv, { configDotenv } from 'dotenv';
import * as functs from './funcs.js'
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

export async function createTable() {
    await connection.query(queries.createT);
}

export async function dropTable() {
    await connection.query(queries.dropT);
}

export async function insertItem(gameID: string) {
    await connection.query(functs.buildString(queries.insertGame, '$', gameID));
}

