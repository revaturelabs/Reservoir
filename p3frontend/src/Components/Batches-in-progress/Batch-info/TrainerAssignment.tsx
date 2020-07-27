import React from "react";
import { Trainer } from "../../../models/Trainer";
import { Batch } from "../../../models/Batch";
import { getBatchById } from "../../Common/API/batch";

import { allTheMapStateToProps } from "../../../redux/reducers";
import { allTheActionMappers } from "../../../redux/action-mapper";
import { connect } from "react-redux";
import { Alert } from "reactstrap";
import { trackPromise } from "react-promise-tracker";
import { Spinner } from "../../Common/spinner";

import {
  getAllTrainers,
  createConsentRequest,
  getAllEligibleTrainers,
  createTrainerBatch,
} from "../../Common/API/consent";

import { Col, Button, ListGroupItem, ListGroup, Row } from "reactstrap";
import { smallBtnStyles } from "../../../stylesheets/generate-batches/generateBatchStlyes";

interface ITrainerProps {
  currentBatch: Batch; //we must give this component a batch for it to work
  parentTop: any;
}

interface IAssignmentComponentState {
  trainers: Trainer[];
  eligibleTrainers: Trainer[];
  updateArray: Trainer[];
  buttonArray: any[];
  batch: Batch | null;
  assignIsOpen: boolean;
  requestIsOpen: boolean;
}

export class TrainerAssignmentComponent extends React.Component<
  ITrainerProps,
  IAssignmentComponentState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      trainers: [],
      eligibleTrainers: [],
      updateArray: [],
      buttonArray: [],
      batch: null,
      assignIsOpen: false,
      requestIsOpen: false,
    };
  }

  async componentDidMount() {
    let allTrainers: Trainer[] = await getAllTrainers();

    let batch = await getBatchById(this.props.currentBatch.batchId);

    let eligibleTrainers: Trainer[] = await getAllEligibleTrainers(
      this.props.currentBatch.batchId
    );

    let tempButtonArray: any[] = [];
    let eligibleTrainerIds = eligibleTrainers.map((trainer) => {
      return trainer.trainerId;
    });

    let i = 0;

    allTrainers.forEach((trainer) => {
      if (eligibleTrainerIds.includes(trainer.trainerId)) {
        trainer.isEligible = true;
      } else {
        trainer.isEligible = false;
      }
      i = i + 1;
    });
    this.setState({
      trainers: allTrainers,
      eligibleTrainers: eligibleTrainers,
      batch: batch,
    });
  }

  sleep = (milliseconds: any) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };
  assign = async (trainerId: number, batchId: number) => {
    trackPromise(
      createTrainerBatch(trainerId, batchId).then((consentRequests) => {
        this.setState({
          assignIsOpen: true,
        });
      }),
      "loading-area"
    );
  };

  request = async (trainer: Trainer, batchId: number) => {
    trackPromise(
      createConsentRequest(trainer.trainerId, null, batchId).then(
        (consentRequests) => {
          this.setState({
            requestIsOpen: true,
          });
        }
      ),
      "loading-area"
    );
  };
  getButton = (trainer: Trainer, i: number, trainerId: number) => {
    let jsxElement = (
      <>
        <h4>test</h4>
      </>
    );
    if (trainer.isEligible) {
      return (
        <Button
          color="primary"
          style={smallBtnStyles}
          id={i.toString()}
          onClick={() =>
            this.assign(trainerId, this.props.currentBatch.batchId)
          }
        >
          Assign
        </Button>
      );
    } else {
      return (
        <Button
          color="primary"
          style={smallBtnStyles}
          id={i.toString()}
          onClick={() => this.request(trainer, this.props.currentBatch.batchId)}
        >
          Request Consent
        </Button>
      );
    }
  };

  toggleAssign() {
    this.setState({
      assignIsOpen: !this.state.assignIsOpen,
    });
  }

  toggleRequest() {
    this.setState({
      requestIsOpen: !this.state.requestIsOpen,
    });
  }

  render() {
    let buttonArray: any[] = [];
    let trainers = this.state.trainers;
    let i = 0;
    trainers.forEach((trainer) => {
      let button = this.getButton(trainer, i, trainer.trainerId);
      buttonArray.push(button);
    });
    return (
      <>
        <div>
          <Spinner area="loading-area" />
        </div>
        <Alert
          color="primary"
          isOpen={this.state.assignIsOpen}
          toggle={this.toggleAssign.bind(this)}
        >
          Trainer Assigned!
        </Alert>
        <Alert
          color="primary"
          isOpen={this.state.requestIsOpen}
          toggle={this.toggleRequest.bind(this)}
        >
          Trainer Requested!
        </Alert>

        <ListGroup>
          {this.state.trainers.length == 0 ? (
            <>There are no trainers</>
          ) : (
            this.state.trainers.map((trainer: Trainer, i) => {
              if (!trainer.isEligible) {
                return (
                  <ListGroupItem key={i}>
                    <Row>
                      <Col>
                        <Row>
                          <Col>
                            {trainer.firstName + " " + trainer.lastName}
                          </Col>
                        </Row>
                        <Row>
                          <Col>{buttonArray[i]}</Col>
                        </Row>
                      </Col>
                    </Row>
                  </ListGroupItem>
                );
              }
            })
          )}
        </ListGroup>
      </>
    );
  }
}

export const TrainerAssignmentRedux = connect(
  allTheMapStateToProps,
  allTheActionMappers
)(TrainerAssignmentComponent);
