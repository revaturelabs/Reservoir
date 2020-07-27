import React from "react";
import { Container, Spinner } from "reactstrap";
import { Associate } from "../../../models/Associate";
import { Batch } from "../../../models/Batch";
import { ErrorAlert } from "../../../Helpers/ErrorAlert";
import { axiosClient } from "../../Common/API/axios";
import { DualTables } from "./DualTables";
import { connect } from "react-redux";
import { allTheActionMappers } from "../../../redux/action-mapper";
import { store } from "../../../redux/store";
import { getActiveAssociates } from "../../Common/API/Associate";
import { allTheMapStateToProps } from "../../../redux/reducers";

/*
  <BatchAssocTable currentBatch={aBatchObject}/>

  Displays dual tables where associates can be assigned or removed form batches.
  Displays the associates assigned to the given batch object.
  Associates can be assigned or removed from the batch.
*/

interface IPBatchAssocTable {
  currentBatch: Batch; //we must give this component a batch for it to work
  parentTop: any;

  addAssociateToBatchActionMapper: (batch: Batch, associate: any) => void;
  removeAssociateFromBatchActionMapper: (batch: Batch, associate: any) => void;
}

export default class BatchAssocTable extends React.Component<
  IPBatchAssocTable,
  any
> {
  constructor(props: IPBatchAssocTable) {
    super(props);
    this.state = {
      eligibleAssociates: [], //interview score >70 and no assigned batch yet
      associatesLoaded: false, //have we fetched the associates from the backend?
      errorObject: null, //when set to an axios error object, it will display the network error nicely
      errorMessage: "", //when set a message it will be displayed, possibly with a network error
    };
  }

  componentDidMount = async () => {
    try {
      const allAssociates: any[] = await getActiveAssociates();

      const eligibleAssociateArray = allAssociates.filter((assoc) => {
        return assoc.interviewScore >= 70 && assoc.batch == null;
        //return assoc.interviewScore >= 70 && assoc.batchId <=0;
      });

      this.setState({
        eligibleAssociates: eligibleAssociateArray,
        associatesLoaded: true,
      });
    } catch (e) {
      this.setState({
        errorObject: e,
        errorMessage: "Could not retrieve all associates",
      });
    }
  };

  render() {
    if (this.props.currentBatch == null)
      return <>BatchAssocTable this.props.currentBatch is null</>;

    return (
      <Container>
        <ErrorAlert
          error={this.state.errorObject}
          message={this.state.errorMessage}
        />

        {this.state.associatesLoaded ? (
          <DualTables
            parentTop={this.props.parentTop}
            onMoveToLeft={(item) => this.patchTheAssoc(item, false)}
            onMoveToRight={(item) => this.patchTheAssoc(item, true)}
            messageLeft="None in the system"
            messageRight="None assigned to this batch"
            arrayLeft={this.state.eligibleAssociates}
            arrayRight={this.props.currentBatch.associates}
            headerLeft={
              <>
                All eligible associates{" "}
                <b>{this.state.eligibleAssociates.length}</b>
              </>
            }
            headerRight={
              <>
                Associates in this batch{" "}
                <b>{this.props.currentBatch.associates.length}</b>
              </>
            }
          />
        ) : (
          <Spinner />
        )}
      </Container>
    );
  }

  /*
    patchTheAssoc(assoc,moveToBatch)

    patches the assoc object.
    when moveToBatch is:
      true, the assoc is assigned to the currentBatch object
      false, the assoc is assigned to no batch at all. null
  */
  patchTheAssoc = async (assoc: any, moveToBatch: boolean) => {
    //associate is a model and not a react component
    //assoc.active = moveToBatch; //set this client side assoc to active or in-active

    //this.props.currentBatch.associates.

    //send an associate and its batch object that is a non-circular data structure
    //Assoc->Batch->Associate[]->Batch was breaking when being sent
    //we want to send this data to the server for it to save directly into the repo
    //I think @JsonIgnore on the back end could make this simpler
    const nonCircularAssocPatch = {
      associateId: assoc.associateId, //copy over all fields. typescript prevents easier copying
      firstName: assoc.firstName,
      lastName: assoc.lastName,
      email: assoc.email,
      active: assoc.active, //set active to true or false
      interviewScore: assoc.interviewScore,
      batch: moveToBatch ? this.props.currentBatch : null, //assign to a batch.
      //we have to watch out because this batch has an array of
      //associates and associates have batches and we get circular json errors when sending
    };

    try {
      await axiosClient.patch("/associates", nonCircularAssocPatch);
      let associate = null;
      nonCircularAssocPatch.batch
        ? (associate = new Associate(
            nonCircularAssocPatch.associateId,
            nonCircularAssocPatch.firstName,
            nonCircularAssocPatch.lastName,
            nonCircularAssocPatch.email,
            nonCircularAssocPatch.active,
            nonCircularAssocPatch.interviewScore,
            nonCircularAssocPatch.batch.batchId
          ))
        : new Associate(
            nonCircularAssocPatch.associateId,
            nonCircularAssocPatch.firstName,
            nonCircularAssocPatch.lastName,
            nonCircularAssocPatch.email,
            nonCircularAssocPatch.active,
            nonCircularAssocPatch.interviewScore,
            undefined
          );
      if (moveToBatch) {
        this.props.addAssociateToBatchActionMapper(
          store.getState().batch.batch,
          nonCircularAssocPatch
        );
      } else {
        this.props.removeAssociateFromBatchActionMapper(
          store.getState().batch.batch,
          nonCircularAssocPatch
        );
      }
      this.setState({});
    } catch (e) {
      this.setState({
        errorObject: e,
        errorMessage: "Could not patch associate",
      });
    }
    this.props.parentTop.setState({}); //re-render
  };
}

export const BatchAssocTableRedux = connect(
  allTheMapStateToProps,
  allTheActionMappers
)(BatchAssocTable);
