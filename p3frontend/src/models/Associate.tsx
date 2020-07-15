import { axiosClient } from "../Components/Common/API/axios";
import { FailedRequestException } from "../Components/Common/Exceptions/FailedRequestException";

export class Associate {
  associateId: number;
  firstName: string;
  lastName: string;
  email: string;
  active: boolean;
  interviewScore: number;
  batchId: number | undefined; //causes circular structure. Batch->Associate->Batch->Associate->...

  constructor(
    associateId: number,
    firstName: string,
    lastName: string,
    email: string,
    active: boolean,
    interviewScore: number,
    batchId?: number
  ) {
    this.associateId = associateId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.active = active;
    this.interviewScore = interviewScore;
    this.batchId = batchId;
  }
}

// This and all imports should be moved/changed to be in api/associate//
/*
    associatesGetActive(arrayOfAssociates,boolFindActive)

    returns an array of associates that match boolFindActive.
    when boolFindActive is true, active associates will be returned
    when boolFindActive is false, inactive associates will be returned
*/
export function associatesGetActive(
  associates: Associate[],
  boolFindActive: boolean
) {
  return associates.filter((associate: Associate) => {
    return associate.active === boolFindActive;
  });
}

/*
    associatesGetActiveTotal(arrayOfAssociates,boolFindActive)

    when boolFindActive is true;  returns the number of active associates
    when boolFindActive is false; returns the number of IN-active associates
*/
export function associatesGetActiveTotal(
  associates: Associate[],
  boolFindActive: boolean
) {
  return associatesGetActive(associates, boolFindActive).length;
}

export async function getAllAssociates(): Promise<Associate[]> {
  try {
    let response = await axiosClient.get("/associates");

    return response.data.map((a: Associate) => {
      return new Associate(
        a.associateId,
        a.firstName,
        a.lastName,
        a.email,
        a.active,
        a.interviewScore,
        a.batchId
      );
    });
  } catch (e) {
    throw new FailedRequestException(`The request has failed.`);
  }
}

export async function updateAssociate(obj: Associate) {
  try {
    const response = await axiosClient.patch("/associates", obj);
  } catch (e) {
    console.log("failed to assign associate to new batch", e.message);
    //throw e;//we do not throw. we put the error into a nice alert component
  }
}

/*
  returns the active associates from the backend
*/
export async function getActiveAssociates(): Promise<Associate[]> {
  try {
    let response = await axiosClient.get("/associates/get-active");
    return response.data;
  } catch (error) {
    throw new FailedRequestException("Failed to fetch active associates");
  }
}
