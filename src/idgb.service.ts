import axios from 'axios';//used for all api calls

type accessKey = {
    access_token: string,
    expires_in: number,
    token_type: string,
};
const gamesEndPoint = "https://api.igdb.com/v4/games/";
export default class igdbService{
    private clientID: string;
    private clientSecret: string;
    private authString: string;
    constructor(cID, cSecret) {
        this.clientID = cID;
        this.clientSecret = cSecret;
        //this.getAuth();
    }

    private getAuth(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (!this.authString) {
                return axios.post('https://id.twitch.tv/oauth2/token', {
                client_id: this.clientID,
                client_secret: this.clientSecret,
                grant_type: "client_credentials"
                }, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then((res) => {
                    const body:accessKey = res.data;
                    this.authString = `Bearer ${body.access_token}`;
                    resolve(this.authString);
                })
            } else {
                resolve(this.authString);
            }
        });
    }

    private sendQuery<T>(endPoint: string, fields: string): Promise<T> {
        return this.getAuth().then(authString => {
            return axios.post(
                endPoint,
                fields,
            { 
                headers: {
                    'Accept': 'application/json',
                    'Client-ID': this.clientID,
                    'Authorization': this.authString,
                },
                    
            })
                .then((response) => {
                    console.log("2\n");
                    console.log(response.data);
                    return response.data;
            })
                .catch(err => {
                    console.error(err);
                    return err;
            });
        })
    }

    public getGames(fields:string): Promise<any[]> {
        return this.sendQuery(gamesEndPoint, fields);
    }
    
} //module.exports = new igdbService(process.env.CLIENT_ID, process.env.CLIENT_SECRET);