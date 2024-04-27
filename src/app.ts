import express from 'express';
import { getLines, endConnection } from './server.js';
import { debug } from 'console';
import apicalypse from 'apicalypse';//this is used for getting data from the api
import axios from 'axios';

const app = express();

app.get('/', (req, res, next) => {
    res.send('Successful response.');
    next();
});

app.get('/grep', async (req, res, next) => {
    const lines = await getLines();
    res.send(lines);
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

const {data} = await axios.post('https://id.twitch.tv/oauth2/token', {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    grant_type: "client_credentials"
  }, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
});

console.log(data);

// const rawQueryString = `client_id%3D${process.env.CLIENT_ID}%26`;

// // async/await
// try {
//     const response = await apicalypse(rawQueryString)
//         .request('https://myapi.com/actors/nm0000216');

//     // This is an axios response: https://github.com/axios/axios#response-schema
//     console.log(response.data); 
// } catch (err) {
//     console.error(err);
// }

const server = app.listen(3000, () => console.log('Example on 3000'));

process.on('SIGTERM', () => {
    debug('SIGTERM signal received: closing HTTP server')
    server.close(() => {
        endConnection();  
        debug('HTTP server closed')
    })
})