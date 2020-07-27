import { Batch, UnconfirmedBatch } from "../../../models/Batch";
import { axiosClient } from "./axios";

// Helper function to construct batch from response
const buildABatch = (respData: any): Batch => {
  const {
    batchId,
    startDate,
    endDate,
    isConfirmed,
    interviewScoreLower,
    trainers,
    location,
    curriculum,
    associates,
    programType,
  } = respData;
  return new Batch(
    batchId,
    startDate,
    endDate,
    isConfirmed,
    interviewScoreLower,
    trainers,
    location,
    curriculum,
    associates,
    programType
  );
};

export async function getAllBatches(): Promise<Batch[]> {
  try {
    const response = await axiosClient.get("/batches");
    const respData = response.data;
    const allBatches: Batch[] = respData.map((b: any) => {
      return buildABatch(b);
    });
    return allBatches;
  } catch (e) {
    throw e;
  }
}

export async function getBatchById(bId: number): Promise<Batch> {
  try {
    const response = await axiosClient.get(`/batches/${bId}`);
    const respData = response.data;
    const theBatch: Batch = buildABatch(respData);
    return theBatch;
  } catch (e) {
    throw e;
  }
}

// Confirm/Unconfirm a batch
export async function updateBatch(
  bId: number,
  isConf: boolean
): Promise<Batch> {
  try {
    const dataTransfer = { isConfirmed: isConf };
    const response = await axiosClient.patch(`/batches/${bId}`, dataTransfer);
    const respData = response.data;
    const theBatch: Batch = buildABatch(respData);
    return theBatch;
  } catch (e) {
    throw e;
  }
}

export async function getBatchesByDate(date: string): Promise<Batch[]> {
  try {
    const response = await axiosClient.get(`/batches/date/${date}`);
    const respData = response.data;
    const theBatches: Batch[] = respData.map((b: any) => {
      return buildABatch(b);
    });
    return theBatches;
  } catch (e) {
    throw e;
  }
}

export async function getBatchesByCurriculaId(
  currId: number
): Promise<Batch[]> {
  try {
    const response = await axiosClient.get(`/batches/curricula/${currId}`);
    const respData = response.data;
    const theBatches: Batch[] = respData.map((b: any) => {
      return buildABatch(b);
    });
    return theBatches;
  } catch (e) {
    throw e;
  }
}

export async function getBatchesByClientId(clientId: number): Promise<Batch[]> {
  try {
    const response = await axiosClient.get(`/batches/clients/${clientId}`);
    const respData = response.data;
    const theBatches: Batch[] = respData.map((b: any) => {
      return buildABatch(b);
    });
    return theBatches;
  } catch (e) {
    throw e;
  }
}

export async function getBatchesByProgType(progType: string): Promise<Batch[]> {
  try {
    const response = await axiosClient.get("/batches");
    const respData = response.data;
    const allBatches: Batch[] = respData.map((b: any) => {
      return buildABatch(b);
    });
    const filteredBatches = allBatches.filter((b: Batch) => {
      return b.programType === progType;
    });
    return filteredBatches;
  } catch (e) {
    throw e;
  }
}

// Assign trainer to a batch (currently returns void) (tables changed --> not implemented)
export async function assignTrainer(
  bId: number,
  trainId: number
): Promise<void> {
  try {
    const dataTransfer = { batchId: bId, trainerId: trainId };
    const response = await axiosClient.post("/trainerbatch", dataTransfer);
  } catch (e) {
    throw e;
  }
}

//Get batches by confirmed, unconfirmed, committed
export async function getUnconfirmedBatches(): Promise<UnconfirmedBatch[]> {
  try {
    const response = await axiosClient.get("/batches/unconfirmed");
    const unconfirmedBatches = response.data;
    return unconfirmedBatches;
  } catch (e) {
    throw e;
  }
}
