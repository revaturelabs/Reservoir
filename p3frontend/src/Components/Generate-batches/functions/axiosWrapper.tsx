import axios from 'axios';

export default async function axiosWrapper(urlExtension: string, method: any, data?: object): Promise<any> {
    // let results = await axios.request({ "url": "http://3.235.74.191:8212/data" + urlExtension, "method": method, "data": data });
    let results: any = await axios.request({ "url": "http://localhost:1235/" + urlExtension, "method": method, "data": data }).catch((err) => []);
    let returnValue = results.data || results;
    return returnValue
}
