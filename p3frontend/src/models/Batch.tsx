import { Trainer } from "./Trainer";
import { Curriculum } from "./Curriculum";
import { Associate } from "./Associate";
import { Location } from "./Location";

/*
  This batch is a clone of what is on the server
*/
export class Batch {
  batchId: number;
  startDate: string;
  endDate: string;
  isConfirmed: boolean;
  interviewScoreLower: number;
  trainers: Trainer[];
  location: Location;
  curriculum: Curriculum;
  associates: Associate[];
  programType: string;

  constructor(
    batchId: number,
    startDate: string,
    endDate: string,
    isConfirmed: boolean,
    interviewScoreLower: number,
    trainers: Trainer[],
    location: Location,
    curriculum: Curriculum,
    associates: Associate[],
    programType: string
  ) {
    this.batchId = batchId;
    this.startDate = startDate;
    this.endDate = endDate;
    this.isConfirmed = isConfirmed;
    this.interviewScoreLower = interviewScoreLower;
    this.trainers = trainers;
    this.location = location;
    this.curriculum = curriculum;
    this.associates = associates;
    this.programType = programType;
  }
}
//REAL TIME Unconfirmed Batch Module
export class UnconfirmedBatch {
  batch_id: number;
  batch_capacity: number;
  start_date: string;
  location: Location;
  curriculum_name: Curriculum;

  constructor(
    batch_id: number,
    batch_capacity: number,
    start_date: string,
    location: Location,
    curriculum_name: Curriculum
  ) {
    this.batch_id = batch_id;
    this.batch_capacity = batch_capacity;
    this.start_date = start_date;
    this.location = location;
    this.curriculum_name = curriculum_name;
  }
}
