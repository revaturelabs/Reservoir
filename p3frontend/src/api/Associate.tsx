import  {Associate} from '../models/Associate'
import FailedRequestException from '../exceptions/FailedRequestException';
import { axiosClient } from './axios';


export async function getAllAssociates() : Promise <Associate[]> {
try {
  
  let response = await axiosClient.get('/associates');
console.log(response);
console.log(response.data);
  return response.data.map((a : Associate) => {

    let {associateId, firstName, lastName, email, active, interviewScore, batch} = a;
console.log (a);
    return new Associate (associateId, firstName, lastName, email, active, interviewScore, batch);
  
  });} catch (e)  {
    throw new FailedRequestException(`The request has failed. ${e.message}`)
  }
}

