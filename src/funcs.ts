import axios from 'axios';//used for all api calls

//string that inserts the 'insert' variable at the first instance fo 'splitter' into Ostring
export function buildString(Ostring: string, splitter: string, insert: any): string {
    let parts = Ostring.split(splitter);
    if (parts.length > 2) {
        return "invalid";
    }
    return parts[0] + insert + parts[1];
}
