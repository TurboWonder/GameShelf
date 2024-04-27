import express from 'express';

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


app.listen(3000, () => console.log('Example on 3000'));