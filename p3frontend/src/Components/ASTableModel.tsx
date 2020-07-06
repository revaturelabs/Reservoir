import React from "react";
import { Table, Button, Container, Row, Col } from "reactstrap";
import { Associate } from "../models/Associate";
import { getAllAssociates, updateAssociate } from "../api/Associate";
import { getBatchById } from "../api/batch";
// import { connect } from "react-redux";
// import { allTheMapStateToProps } from "../redux/reducers";
// import { Batch } from "../models/Batch";

// interface IASTableModelProps {
//   currentBatch: Batch;
// }

interface IASTableModelState {
  currentBatchId: number;
  associates: Associate[];
  eligibleAssociates: Associate[];
  associatesInBatch: Associate[];
  associatesLoaded: boolean;
}

export class ASTableModel extends React.Component<
  any,
  IASTableModelState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      currentBatchId: 3,
      associates: [], //everybody that comes from the backend
      eligibleAssociates: [], //interview score >70 and no assigned batch yet
      associatesInBatch: [], //associates chosen for the current batch
      associatesLoaded: false,
    };
  }

  async componentDidMount() {
    const associateArray: Associate[] = await getAllAssociates();
    //console.log(`ComponentDidMount ${JSON.stringify(associateArray)}`);
    const eligibleAssociateArray = associateArray.filter(function (a) {
      return a.interviewScore >= 70 && a.batchId === null;
    });
    const associatesInBatch = associateArray.filter((a) => {
      if (a.batchId === null) return false;

      return a.interviewScore >= 70 && a.batchId === this.state.currentBatchId;
    });

    this.setState({
      associates: associateArray,
      eligibleAssociates: eligibleAssociateArray,
      associatesInBatch: associatesInBatch,
      associatesLoaded: true,
    });
    console.log(this.state.eligibleAssociates);
    console.log(associatesInBatch);
  }

  associateAdd = async (obj: Associate, i: number) => {
    this.state.associatesInBatch.push(obj);
    this.state.eligibleAssociates.splice(i, 1);
    console.log(obj.batchId);
    console.log(obj);
    obj.active = true;
    await updateAssociate(obj);
    this.setState({});
  };

  associateRemove = async (obj: Associate, i: number) => {
    this.state.associatesInBatch.splice(i, 1);
    this.state.eligibleAssociates.push(obj);
    obj.batchId= this.state.eligibleAssociates[0].batchId;
    obj.active = false;
    console.log(obj.batchId);
    console.log(obj);
    await updateAssociate(obj);
    this.setState({});
  };

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <h4>All Available Associates</h4>
            {this.displayTable(
              this.state.eligibleAssociates,
              "No eligible associates left.",
              "Add",
              this.associateAdd
            )}
          </Col>
          <Col>
            <h4>Batch Associates</h4>
            {this.displayTable(
              this.state.associatesInBatch,
              "No associates currently assigned to this batch.",
              "Remove",
              this.associateRemove
            )}
          </Col>
        </Row>
      </Container>
    );
  }

  displayTable = (
    array: Associate[],
    message: String,
    displayText: String,
    itemClick: any
  ) => {
    if (array.length === 0) {
      return <>{message}</>;
    }
    return (
      <Table striped>
        <tbody>
          {array.map((obj: any, index: number) => {
            return (
              <tr key={index}>
                <td>
                  {obj.firstName}, {obj.lastName}, {obj.interviewScore}
                </td>
                <td>
                  <Button onClick={() => itemClick(obj, index)}>
                    {displayText}
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  };
}


