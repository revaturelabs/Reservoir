import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Col,
  ButtonGroup,
} from "reactstrap";
import "../../../index.css";
import { connect } from "react-redux";
import { allTheMapStateToProps } from "../../../redux/reducers";
import { allTheActionMappers } from "../../../redux/action-mapper";
import { Batch } from "../../../models/Batch";
import { ErrorAlert } from "../../../Helpers/ErrorAlert";
import { axiosClient } from "../../Common/API/axios";
import { BatchTrainersTableRedux } from "../Batch-info/BatchTrainersTable";
import { store } from "../../../redux/store";
import { BatchAssocTableRedux } from "../Batch-info/BatchAssocTable";
import { TrainerAssignmentRedux } from "../Batch-info/TrainerAssignment";

interface IPBatchViewModal {
  currentBatch: Batch;
  parentTop: any;
  isOpen: boolean;
  toggle: () => void;

  batchClickActionMapper: (batch: Batch) => void;
  batchUpdateActionMapper: (batch: Batch) => void;
}

export class TimelineBatchModal extends React.Component<IPBatchViewModal, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      displayType: "AA",
      errorObj: null,
      errorMsg: "",
    };
  }

  render() {
    const toggle = () => {
      this.setState({ showThis: !this.state.showThis });
      if (
        store.getState().batch.batch &&
        store.getState().batch.batch.batchId === this.props.currentBatch.batchId
      ) {
        //  this.props.batchClickActionMapper(store.getState().batch.batch)
        return;
      } else {
        this.props.batchClickActionMapper(this.props.currentBatch);
      }
    };

    return (
      <>
        <Modal
          isOpen={this.props.isOpen}
          contentClassName="modalStyle"
          size="lg"
        >
          <ModalHeader toggle={this.props.toggle}>
            Batch {this.props.currentBatch.batchId}
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col>
                <b>Start Date:</b>
              </Col>
              <Col>{this.props.currentBatch.startDate}</Col>
            </Row>
            <Row>
              <Col>
                <b>End Date: </b>
              </Col>
              <Col>{this.props.currentBatch.endDate}</Col>
            </Row>
            <Row>
              <Col>
                <b>Curriculum Name:</b>
              </Col>
              <Col>
                {this.props.currentBatch.curriculum
                  ? this.props.currentBatch.curriculum.name
                  : "no-curriculum"}
              </Col>
            </Row>
            <Row>
              <Col>
                <b>Program Type: </b>
              </Col>
              <Col>
                {this.props.currentBatch.programType === "null"
                  ? "N/A"
                  : this.props.currentBatch.programType}
              </Col>
            </Row>
            <Row>
              <Col>
                <b>Confirmed</b>
                <br />

                <ButtonGroup>
                  <Button
                    color={
                      this.props.currentBatch.isConfirmed
                        ? "primary"
                        : "secondary"
                    }
                    onClick={this.patchABatchChangeIsConfirmed}
                  >
                    Yes
                  </Button>
                  <Button
                    color={
                      this.props.currentBatch.isConfirmed
                        ? "secondary"
                        : "primary"
                    }
                    onClick={this.patchABatchChangeIsConfirmed}
                  >
                    No
                  </Button>
                </ButtonGroup>
              </Col>
            </Row>
            <Row>
              <ErrorAlert
                error={this.state.errorObj}
                message={this.state.errorMsg}
              />
            </Row>
            <br />
            <Row>
              <Col xs={10}>
                <ul className="nav nav-tabs">
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      style={{
                        backgroundColor:
                          this.state.displayType == "AA"
                            ? "rgba(242, 105, 38)"
                            : "white",
                        color:
                          this.state.displayType == "AA" ? "white" : "black",
                        border: "1px solid black",
                      }}
                      onClick={() => {
                        this.setState({ displayType: "AA" });
                      }}
                    >
                      Assign Associates
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      style={{
                        backgroundColor:
                          this.state.displayType == "AT"
                            ? "rgba(242, 105, 38)"
                            : "white",
                        color:
                          this.state.displayType == "AT" ? "white" : "black",
                        border: "1px solid black",
                      }}
                      onClick={() => {
                        this.setState({ displayType: "AT" });
                      }}
                    >
                      Assign Trainers
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      style={{
                        backgroundColor:
                          this.state.displayType == "RC"
                            ? "rgba(242, 105, 38)"
                            : "white",
                        color:
                          this.state.displayType == "RC" ? "white" : "black",
                        border: "1px solid black",
                      }}
                      onClick={() => {
                        this.setState({ displayType: "RC" });
                      }}
                    >
                      Request Consent
                    </a>
                  </li>
                </ul>
              </Col>
              <Col>
                <Button
                  onClick={toggle}
                  color="success"
                  //style={{ float: "right" }}
                >
                  OK
                </Button>
              </Col>
            </Row>
            <hr />
          </ModalBody>
          <ModalBody>
            {
              this.state.displayType == "RC" ? ( //request consent for trainers
                <TrainerAssignmentRedux
                  currentBatch={this.props.currentBatch}
                  parentTop={this.props.parentTop}
                />
              ) : this.state.displayType == "AA" ? ( //assign associates to this batch
                <BatchAssocTableRedux
                  currentBatch={this.props.currentBatch}
                  parentTop={this.props.parentTop}
                />
              ) : this.state.displayType == "AT" ? ( //assign trainers to this batch
                <BatchTrainersTableRedux
                  currentBatch={this.props.currentBatch}
                  parentTop={this.props.parentTop}
                />
              ) : (
                <></>
              ) //free space
            }
          </ModalBody>
        </Modal>
      </>
    );
  }

  patchABatchChangeIsConfirmed = async () => {
    //change the batch model which is not a react component. just js object
    this.props.currentBatch.isConfirmed = !this.props.currentBatch.isConfirmed;

    try {
      let request = { isConfirmed: this.props.currentBatch.isConfirmed };

      await axiosClient.patch(
        `/batches/${this.props.currentBatch.batchId}`,
        request
      );

      this.props.batchUpdateActionMapper(this.props.currentBatch);
      this.setState({});
    } catch (e) {
      this.setState({
        errorObj: e,
        errorMsg: `Could not change isConfirmed to ${
          this.props.currentBatch.isConfirmed ? "Yes" : "No"
        }`,
      });
    }

    this.props.parentTop.setState({}); //re-render
  };
}
export const ReduxTimelineBatchModal = connect(
  allTheMapStateToProps,
  allTheActionMappers
)(TimelineBatchModal);
