//This file contains the queries into the mysql database for the middleware to use



export const getLine = "SELECT * FROM GameShelf";
export const createT = `CREATE TABLE IF NOT EXISTS Shelf (
    id int NOT NULL PRIMARY KEY, 
    date timestamp DEFAULT CURRENT_TIMESTAMP, 
    presetation float, 
    sound float, 
    gameplay float, 
    status int NOT NULL DEFAULT 0)`;
export const dropT = "DROP TABLE IF EXISTS Shelf";
export const insertGame = "INSERT INTO Shelf (id, date) VALUES ($, CURRENT_TIMESTAMP)";//split string at $ and insert value
