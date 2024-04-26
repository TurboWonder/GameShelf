import express from 'express';
import mysql, { PoolOptions } from 'mysql2';
import queries from './queries.cjs';

const access: PoolOptions = {
    host: 'localhost',
    user: 'root',
    password: 'gameSh3lfp4ss%',
    database: 'gameShelfTest',
}

const connection = mysql.createPool(access).promise();
console.log(queries.q.getLine);

//const result = await connection.query(queries.getAllEntries);
//console.log(result[0]);

const app = express();

app.get('/', (req, res, next) => {
    res.send('Successful response.');
    next();
});

app.get('/grep', (req, res, next) => {
    res.send('Biiiiiig grep');
    next();
});

app.use((req, res, next) => {
    console.log('Time', Date.now());
    next();
});

app.use('/grep', (req, res, next) => {
    console.log('Req type', req.method);
    next();
});


connection.end();

app.listen(3000, () => console.log('Example on 3000'));

