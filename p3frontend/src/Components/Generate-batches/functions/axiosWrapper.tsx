import axios from 'axios';

export default async function axiosWrapper(urlExtension:string, method:any, data?:object):Promise<any>
{
    let results =await axios.request({"url":"http://3.235.74.191:8212/data"+urlExtension,"method":method, "data":data});
    let returnValue =results.data;
    return returnValue
}
