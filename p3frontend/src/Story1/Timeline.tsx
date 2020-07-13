import React from "react";
import Timeline from "react-calendar-timeline";
import moment from "moment";
import "./Timeline.css";
import { Batch } from "../models/Batch";
import { allTheMapStateToProps } from "../redux/reducers";
import { allTheActionMappers } from "../redux/action-mapper";
import { connect } from "react-redux";
import { Toast } from "reactstrap";
import { TimelineModal } from "./TimelineModal";
import { store } from "../redux/store";
import {
  ReduxTimelineBatchModal,
  TimelineBatchModal,
} from "./TimelineBatchModal";
import { EasyTooltip } from "../GeneralPurposeHelpers/EasyTooltip";

interface TimelineComponentProps {
  batches: Batch[];
}

interface TimelineComponentState {
  //batches:  any,
  groups: any;
  items: any;

  prevent: any;
  isOpen: boolean;
  toggle: any;
  batchIsOpen: boolean;
  //  index : number
}

export class TimelineComponent extends React.Component<
  any,
  TimelineComponentState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      //batches: null,
      groups: null,
      items: null,

      prevent: false,
      isOpen: false,
      toggle: false,
      batchIsOpen: false,
      //    index: 0,
    };
  }

  componentDidUpdate = (prevProps: any) => {
    if (prevProps.batches !== this.props.batches) {
      this.changeState();
    }
  };

  changeState = () => {
    //sets the groups and items for the timeline component
    console.log("hello");
    let mappedGroups: any[] = [];
    let mappedItems: any[] = [];

    this.props.batches &&
      this.props.batches.map((batch: Batch, index: number) => {
        let group = {
          id: batch.batchId,
          title: ` ${batch.location.locationName}`,
        };
        let item = {
          id: batch.batchId,
          group: batch.batchId,
          title: `${batch.curriculum.name}`,
          start_time: moment(batch.startDate),
          end_time: moment(batch.endDate).add(1, "day"),
          canMove: false,
          canResize: false,
          canChangeGroup: false,
          color: "rgb(0, 14, 206)",

          itemProps: {
            onContextMenu: (event: any) => {
              this.displayBatchInfo(batch);
            },

            onDoubleClick: () => {
              this.showBatchModal(batch);
            },
          },
        };

        mappedGroups.push(group);
        mappedItems.push(item);
      });
    console.log(mappedItems);
    this.setGroupsAndItems(mappedGroups, mappedItems);
  };

  toggle = () => {
    let toggle = !this.state.toggle;
    this.setState({
      toggle: toggle,
    });
  };

  setGroupsAndItems = (groups: any[], items: any[]) => {
    this.setState({
      groups: groups,
      items: items,
    });
  };
  componentDidMount() {
    let timer: any;
    let alreadyClicked = false;
    //await this.setBatches();
    let mappedGroups: any[] = [];
    let mappedItems: any[] = [];

    this.props.batches &&
      this.props.batches.map((batch: Batch, index: number) => {
        let group = {
          id: batch.batchId,
          title: ` ${batch.location.locationName}`,
        };
        let item = {
          id: batch.batchId,
          group: batch.batchId,
          title: `${batch.curriculum.name}`,
          start_time: moment(batch.startDate),
          end_time: moment(batch.endDate).add(1, "day"),
          canMove: false,
          canResize: false,
          canChangeGroup: false,
          color: "rgb(0, 14, 206)",
          // onItemClick:()=>{alert("sdf")},
          //    onClick:()=>{alert("sfds")},
          // selectedBgColor: 'rgba(225, 166, 244, 1)',

          itemProps: {
            onContextMenu: (event: any) => {
              this.displayBatchInfo(batch);
            },

            onDoubleClick: () => {
              this.showBatchModal(batch);
            },
          },
        };

        mappedGroups.push(group);
        mappedItems.push(item);
      });
    this.setGroupsAndItems(mappedGroups, mappedItems);
    console.log(mappedGroups, mappedItems);
  }

  setIsOpen = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  displayBatchInfo = (batch: Batch) => {
    this.props.batchClickActionMapper(batch);
    this.setIsOpen();
  };

  setBatchIsOpen = () => {
    let batchIsOpen = !this.state.batchIsOpen;
    this.setState({
      batchIsOpen: batchIsOpen,
    });
  };
  showBatchModal = (batch: Batch) => {
    this.props.batchClickActionMapper(batch);
    //  this.setIndex(index)
    this.setBatchIsOpen();
    console.log(store.getState().batch.batch);
  };

  // setIndex = (index: number) => {
  //     let newIndex = index
  //     this.setState({
  //         index : newIndex
  //     })
  // }

  render() {
    console.log(this.state.items);
    if (this.state.items && this.state.items.length > 0) {
      return (
        <div>
          {/* <Button color="" onClick={this.toggle} id="info">
          <i className="fas fa-info-circle"></i>
          </Button> */}
          <i className="fas fa-info-circle " onClick={this.toggle} id="info"></i>

          <EasyTooltip target={'info'} displayText='Double click batch to edit or right click to view information.' />

          {/* <Toast isOpen={this.state.toggle}>
            Double click batch to edit or right click to view information.
          </Toast> */}
          <br />

          <Timeline
            groups={this.state.groups}
            items={this.state.items}
            defaultTimeStart={moment().add(-4, "months")}
            defaultTimeEnd={moment().add(2, "months")}
          ></Timeline>
          {this.state.isOpen ? (
            <TimelineModal
              isOpen={this.state.isOpen}
              toggle={this.setIsOpen}
              batch={store.getState().batch.batch}
            />
          ) : (
            <></>
          )}
          {this.state.batchIsOpen ? (
            <ReduxTimelineBatchModal
              currentBatch={store.getState().batch.batch}
              isOpen={this.state.batchIsOpen}
              toggle={this.setBatchIsOpen}
              parentTop={this.props.parentTop}
            />
          ) : (
            <></>
          )}
        </div>
      );
    } else if (this.state.items && this.state.items.length < 1) {
      return <h2>No batches exist with current filters</h2>;
    } else {
      return <p>Loading...</p>;
    }
  }
}

export const TimelineRedux = connect(
  allTheMapStateToProps,
  allTheActionMappers
)(TimelineComponent);
