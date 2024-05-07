import express from 'express';
import * as serverSide from './server.js';
import { debug } from 'console';
import axios from 'axios';//used for all api calls

//type of access key
type accessKey = {
    access_token: string,
    expires_in: number,
    token_type: string,
};


const {data}:{data:accessKey} = await axios.post('https://id.twitch.tv/oauth2/token', {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    grant_type: "client_credentials"
}, {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
});

const clientID = process.env.CLIENT_ID;
const authString = `Bearer ${data.access_token}`;

axios.post(
    "https://api.igdb.com/v4/games",
    "fields name,involved_companies; search \"Paper Mario\"; limit 10;",
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

app.use((req, res, next) => {
    console.log('Time', Date.now());
    next();
});

app.get('/create', async (req, res, next) => {
    serverSide.createTable();
    res.send("success");
    next();
});

app.get('/drop', async (req, res, next) => {
    serverSide.dropTable();
    res.send("success");
    next();
});

app.get('/insert', async (req, res, next) => {
    serverSide.insertItem("123455");
    res.send("insert complete");
    next();
})

//console.log(data);

const server = app.listen(3000, () => console.log('Example on 3000'));

//end the application gracefully?
process.on('SIGTERM', () => {
    debug('SIGTERM signal received: closing HTTP server')
    server.close(() => {
        serverSide.endConnection();  
        debug('HTTP server closed')
    })
})