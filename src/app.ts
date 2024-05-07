import express from 'express';
import * as serverSide from './server.js';
import { debug } from 'console';
import axios from 'axios';//used for all api calls
import { sendQuery } from './funcs.js';
import igdb from './idgb.service.js'

//type of access key
// type accessKey = {
//     access_token: string,
//     expires_in: number,
//     token_type: string,
// };

const fields = "fields name,involved_companies; search \"Paper Mario\"; limit 10;";

// const {data}:{data:accessKey} = await axios.post('https://id.twitch.tv/oauth2/token', {
//     client_id: process.env.CLIENT_ID,
//     client_secret: process.env.CLIENT_SECRET,
//     grant_type: "client_credentials"
// }, {
//     headers: {
//         'Content-Type': 'application/x-www-form-urlencoded'
//     }
// });

// const clientID = process.env.CLIENT_ID;
// const authString = `Bearer ${data.access_token}`;

// const resp = sendQuery(endpoint, fields, clientID, authString);
// console.log(resp);

const apiPort = new igdb(process.env.CLIENT_ID, process.env.CLIENT_SECRET)

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
});

//gets everything currently in the database
app.get('/display/data', async (req, res, next) => {
    const lines = await serverSide.getLines();
    res.send(lines);
    next();
});

//displays information about a game that is searched for
app.get('/display/game', async (req, res, next) => {
    apiPort.getGames(fields)
        .then(data => {
            res.send(data);
            next();
        })
});

const server = app.listen(3000, () => console.log('Example on 3000'));

//end the application gracefully?
process.on('SIGTERM', () => {
    debug('SIGTERM signal received: closing HTTP server')
    server.close(() => {
        serverSide.endConnection();  
        debug('HTTP server closed')
    })
})