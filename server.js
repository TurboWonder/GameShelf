import express from 'express';
import mysql from 'mysql2';

const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'gameSh3lfp4ss%',
    database: 'gameShelfTest',
    port: '3306'
}).promise();


const result = await connection.query('SELECT * FROM GameShelf');
console.log(result[0]);

const app = express();

app.get('/', (req, res) => {
    res.send('Successful response.');
});

app.get('/grep', (req, res) => {
    res.send('Biiiiiig grep');
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

