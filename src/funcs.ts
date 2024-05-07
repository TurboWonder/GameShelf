import axios from 'axios';//used for all api calls

//string that inserts the 'insert' variable at the first instance fo 'splitter' into Ostring
export function buildString(Ostring: string, splitter: string, insert: any): string {
    let parts = Ostring.split(splitter);
    if (parts.length > 2) {
        return "invalid";
    }
    return parts[0] + insert + parts[1];
}

export function sendQuery<T>(endPoint: string, fields: string, clientID: string, authString: string): Promise<T> {
    return axios.post(
        endPoint,
        fields,
    { 
        headers: {
            'Accept': 'application/json',
            'Client-ID': clientID,
            'Authorization': authString,
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
}