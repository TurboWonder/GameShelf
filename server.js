const express  = require('express');
//const serveIndex = require('serve-index');
const mysql = require('mysql');
const connection = mysql.connection({
    host: 'localhost',
    user: 'gameshelfuser',
    password: 'i<3grep',
    database: 'myshelf'
});



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

//app.use('/public', express.static('public'));
//app.use('/public', serveIndex('public'));

app.listen(3000, () => console.log('Example on 3000'));

