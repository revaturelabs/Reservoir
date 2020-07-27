import React from "react";
import Timeline from "react-calendar-timeline";
import moment from "moment";
import "../../../stylesheets/batches-in-progress/Timeline.css";
import { Batch } from "../../../models/Batch";
import { allTheMapStateToProps } from "../../../redux/reducers";
import { allTheActionMappers } from "../../../redux/action-mapper";
import { connect } from "react-redux";
import { store } from "../../../redux/store";
import { ReduxTimelineBatchModal } from "./TimelineBatchModal";
import { EasyTooltip } from "../../Common/EasyTooltip";

interface TimelineComponentState {
  groups: any;
  items: any;

  prevent: any;
  isOpen: boolean;
  toggle: any;
  batchIsOpen: boolean;
}

export class TimelineComponent extends React.Component<
  any,
  TimelineComponentState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      groups: null,
      items: null,

      prevent: false,
      isOpen: false,
      toggle: false,
      batchIsOpen: false,
    };
  }

  componentDidUpdate = (prevProps: any) => {
    if (prevProps.batches !== this.props.batches) {
      this.changeState();
    }
  };

  changeState = () => {
    //sets the groups and items for the timeline component
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
          color: "rgb(0,0,0)",

          itemProps: {
            onContextMenu: (event: any) => {
              this.displayBatchInfo(batch);
            },

            onDoubleClick: () => {
              this.showBatchModal(batch);
            },
            style: batch.trainers.length
              ? {
                  background: "green",
                  border: "1px solid black",
                }
              : {
                  background: "rgb(185, 185, 186)",
                  border: "1px solid white",
                },
          },
        };

        mappedGroups.push(group);
        mappedItems.push(item);
      });
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
          color: "rgb(0,0, 0)",

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
    this.setBatchIsOpen();
  };

  render() {
    if (this.state.items && this.state.items.length > 0) {
      return (
        <div>
          <i
            className="fas fa-info-circle "
            onClick={this.toggle}
            id="info"
          ></i>

          <EasyTooltip
            target={"info"}
            displayText="Double click batch to edit. Green Batches have trainers assigned, grey batches do not trainers."
          />

          <br />

          <Timeline
            groups={this.state.groups}
            items={this.state.items}
            defaultTimeStart={moment().add(-4, "months")}
            defaultTimeEnd={moment().add(2, "months")}
          ></Timeline>

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
