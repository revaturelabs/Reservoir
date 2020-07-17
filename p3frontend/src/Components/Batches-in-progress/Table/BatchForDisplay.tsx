import { associatesGetActiveTotal } from "../../../models/Associate";
import { locationGetName } from "../../../models/Location";
import { convertDateToUTC } from "../../../Helpers/convertDateToUTC";
import { dateDifferenceWeeks } from "../../../Helpers/dateDifferenceWeeks";
import React from "react";
import { Batch } from "../../../models/Batch";
import { Col, Container, Row } from "reactstrap";
import { BatchViewModalRedux } from "./BatchViewModal";

/*
  This batch has additional information for display on the front end.
  For example, it does calculations on dates using a start and end date.
  It is a batch with additional stuff.
  this can display a batch as a row in a table.
*/
interface IPBatchForDisplay {
  parentTop: any;
  batch: Batch;
}

export class BatchForDisplay extends React.Component<IPBatchForDisplay, any> {
  /*
    Returns a BatchForDisplay which is derived from a server side batch
  */
  constructor(props: any) {
    super(props);

    let dateStart = convertDateToUTC(props.batch.startDate); //convert strings to Date objects
    let dateEnd = convertDateToUTC(props.batch.endDate);

    let weekC = dateDifferenceWeeks(dateStart, convertDateToUTC()); //calc current week we are on
    let weekR = dateDifferenceWeeks(convertDateToUTC(), dateEnd); //calc weeks remaining

    let jsxWeekC = <>{weekC}</>; //we want to know how to display the weeks
    let jsxWeekR = <>{weekR}</>; //when now() is outside the week range, we want some nice display text

    if (Date.now() < dateStart.getTime()) {
      //if the batch hasn't started yet
      jsxWeekC = <>Happening soon</>;
    }

    if (Date.now() > dateEnd.getTime()) {
      //if the batch is overwith
      jsxWeekR = <>Already happened</>;
    }

    //transform and copy the server batch object to display batch format
    this.state = {
      //batch: props.batch,

      dateStartText:
        dateStart.toDateString().substring(0, 3) +
        "." +
        dateStart.toDateString().substring(3, 10) +
        "," +
        dateStart.toDateString().substring(10, 15), //used to display the date
      dateEndText:
        dateEnd.toDateString().substring(0, 3) +
        "." +
        dateEnd.toDateString().substring(3, 10) +
        "," +
        dateEnd.toDateString().substring(10, 15),

      dateSortStart: dateStart.getTime(), //used to sort the dates
      dateSortEnd: dateEnd.getTime(),

      weekSortCurrent: weekC, //the weeks as a number so they can be sorted
      weekSortRemaining: weekR,

      jsxWeekCurrent: jsxWeekC, //the weeks as jsx for display
      jsxWeekRemaining: jsxWeekR,
    };
  }

  // This is to make sure the component will update its state properly whenever the props change
  componentWillReceiveProps(newProps: any) {
    let dateStart = convertDateToUTC(newProps.batch.startDate); //convert strings to Date objects
    let dateEnd = convertDateToUTC(newProps.batch.endDate);

    let weekC = dateDifferenceWeeks(dateStart, convertDateToUTC()); //calc current week we are on
    let weekR = dateDifferenceWeeks(convertDateToUTC(), dateEnd); //calc weeks remaining

    let jsxWeekC = <>{weekC}</>; //we want to know how to display the weeks
    let jsxWeekR = <>{weekR}</>; //when now() is outside the week range, we want some nice display text

    if (Date.now() < dateStart.getTime()) {
      //if the batch hasn't started yet
      jsxWeekC = <>Happening soon</>;
    }

    if (Date.now() > dateEnd.getTime()) {
      //if the batch is overwith
      jsxWeekR = <>Already happened</>;
    }

    //transform and copy the server batch object to display batch format
    this.state = {
      batch: newProps.batch,

      dateStartText: dateStart.toDateString(), //used to display the date
      dateEndText: dateEnd.toDateString(),

      dateSortStart: dateStart.getTime(), //used to sort the dates
      dateSortEnd: dateEnd.getTime(),

      weekSortCurrent: weekC, //the weeks as a number so they can be sorted
      weekSortRemaining: weekR,

      jsxWeekCurrent: jsxWeekC, //the weeks as jsx for display
      jsxWeekRemaining: jsxWeekR,
    };
  }

  render() {
    return this.displayAsTableRow();
  }

  upperCaseName = () => {};
  /*
    Displays the batchForDisplay as something presentable for a row in a table.
    Maybe there will be other kinds of displays for a batch.
  */
  displayAsTableRow = () => {
    return (
      <>
        <td>
          <strong>Curriculum: </strong>
          {this.props.batch.curriculum.curriculumSkillset.skillSetName}
          <br />
          <strong>Trainer(s): </strong>
          {this.props.batch.trainers.length == 0 ? (
            <> nobody</>
          ) : (
            this.props.batch.trainers.map((trainer: any) => {
              let firstLetter: string = trainer.firstName.slice(0, 1);
              firstLetter = firstLetter.toUpperCase();
              return <>{firstLetter + trainer.firstName.slice(1)}, </>;
            })
          )}
          <br />
          <strong>ID: </strong>
          {this.props.batch.batchId}
        </td>
        <td>
          <strong>Started: </strong> {this.state.dateStartText}
          <br />
          <strong>Ends: </strong>
          {this.state.dateEndText}
          <br />
          <strong>Current Week: </strong>
          {this.state.jsxWeekCurrent}
        </td>

        <td>
          <strong>Location: </strong>
          {locationGetName(this.props.batch.location)}
          <br />
          
          
          <strong>Associates: </strong>
          {this.props.batch.associates
            ? this.props.batch.associates.length
            : "none"}
        </td>
        <td className="batchTable">
          <BatchViewModalRedux
            currentBatch={this.props.batch}
            parentTop={this.props.parentTop}
          />
          <br />

          {/* <br />
          C {this.props.batch.isConfirmed ? "Y" : "N"}
          <br />
          AT {this.props.batch.associates.length} */}
        </td>
      </>
    );
  };
}
