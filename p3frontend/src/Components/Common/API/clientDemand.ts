import { axiosClient } from "./axios";
import { ClientDemands } from "../../../models/ClientDemands";
import { GraphData } from "../../../models/GraphData";
import moment from "moment";

const buildCliDem = (res: any): ClientDemands => {
  const {
    clientDemandId,
    quantity,
    deadline,
    client,
    clientDemandSkillset,
  } = res;
  return new ClientDemands(
    clientDemandId,
    quantity,
    deadline,
    client.name,
    clientDemandSkillset.skillSetName
  );
};

export async function getAllClientDemands(): Promise<ClientDemands[]> {
  try {
    const response = await axiosClient.get("/client-demand");
    console.log(response.data);
    const demandArr: ClientDemands[] = response.data.map(
      (cl: ClientDemands) => {
        return buildCliDem(cl);
      }
    );
    return demandArr;
  } catch (error) {
    console.log(`Failed to get all client demands: `, error);
    throw error;
  }
}

export async function getAllCurrentClientDemands(): Promise<ClientDemands[]> {
  let today = moment().format("YYYY-MM-DD");
  try {
    const response = await axiosClient.get(`/client-demand/${today}`);
    const demandArr: ClientDemands[] = response.data.map(
      (cl: ClientDemands) => {
        return buildCliDem(cl);
      }
    );
    return demandArr;
  } catch (error) {
    console.log(`Failed to get all current client demands: `, error);
    throw error;
  }
}

//Axios request for back end matrix
//Could have labeled objects by timeframe/curr/supply first i guess
export async function getTotalSupply(): Promise<GraphData> {
  try {
    const response = await axiosClient.get("/skillsets/matrix");

    // const demandArr: ClientDemands[] = response.data.map(
    //   (cl: ClientDemands) => {
    //     return buildCliDem(cl);
    //   }
    // );
    // return demandArr;
    let total_demand: number = response.data.total_demand;
    let committed_1m: number = response.data.committed.total_1_month;
    let committed_3m: number = response.data.committed.total_3_months;
    let committed_curr: number =
      response.data.committed.total_currently_available;
    let committed_supply: number = response.data.committed.total_supply;
    let confirmed_1m: number = response.data.confirmed.total_1_month;
    let confirmed_3m: number = response.data.confirmed.total_3_months;
    let confirmed_curr: number =
      response.data.confirmed.total_currently_available;
    let confirmed_supply: number = response.data.confirmed.total_supply;

    let matrix = {
      total_demand,
      committed_1m,
      committed_3m,
      committed_curr,
      committed_supply,
      confirmed_1m,
      confirmed_3m,
      confirmed_curr,
      confirmed_supply,
    };
    return matrix;
  } catch (error) {
    console.log(`Failed to get all current client demands: `, error);
    throw error;
  }
}
