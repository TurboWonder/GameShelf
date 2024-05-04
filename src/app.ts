import express from 'express';
import { getLines, endConnection } from './server.js';
import { debug } from 'console';
//import apicalypse from 'apicalypse';
//import igdb from 'igdb-api-node';//this is used for getting data from the API
import axios from 'axios';//this is sed to get the key to access that API

//type of access key
type accessKey = {
    access_token: string,
    expires_in: number,
    token_type: string,
};

const clientID = process.env.CLIENT_ID;

const {data}:{data:accessKey} = await axios.post('https://id.twitch.tv/oauth2/token', {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    grant_type: "client_credentials"
  }, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
});

const authString = `Bearer ${data.access_token}`;
console.log(process.env.CLIENT_ID + " " + data.access_token)

axios.post(
    "https://api.igdb.com/v4/games",
    "fields *; limit 10;",
    { 
        headers: {
            'Accept': 'application/json',
            'Client-ID': clientID,
            'Authorization': authString,
    },
        
})
    .then((response) => {
        console.log(response.data);
    })
    .catch(err => {
        console.error(err);
    });



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

//console.log(data);

const server = app.listen(3000, () => console.log('Example on 3000'));

//end the application gracefully?
process.on('SIGTERM', () => {
    debug('SIGTERM signal received: closing HTTP server')
    server.close(() => {
        endConnection();  
        debug('HTTP server closed')
    })
})