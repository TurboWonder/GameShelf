//This file contains the queries into the mysql database for the middleware to use

export const getLine = "SELECT * FROM GameShelf";
export const createT = "CREATE TABLE IF NOT EXISTS Shelf (id int NOT NULL, date timestamp, presetation float, sound float, gameplay float, status int NOT NULL)";
export const dropT = "DROP TABLE IF EXISTS Shelf";


//export const getlines3 = "SELECT * FROM GameShelf";