import React from "react";
import { Container, Row, Col } from "reactstrap";
import "../../stylesheets/supply-demand/supply-demand.css";
import { PageTitleBar } from "../Common/PageTitleBar";
import TestChart from "./StackedBarGraph";

export class OverviewClientDemand extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      curriculaTrack: "", //EasyDropdown will set this to the first item on component mount
      when: "",
    };
  }

  render() {
    return (
      <Container>
        <PageTitleBar pageTitle={"Client Demand Overview"} />
        <Row>
          <Col className="center-items-div">
            <h3 className="center-text">Client Demands vs Revature Supply</h3>
          </Col>
        </Row>
        <Row className="center-items-div">
          <TestChart />
        </Row>
        <Row>
          <Col className="center-items-div">
            <p className="center-text">
              The above chart compares all current client demand for any given
              skillset vs what Revature has available to place today, in 1
              month, and in 3 months. Supply totals are calculated based on
              associates' batches' end dates.
            </p>
          </Col>
        </Row>
      </Container>
    );
  }

  setWhen = (w: string) => {
    this.setState({ when: w });
  };

  setCurriculaTrack = (ct: string) => {
    this.setState({ curriculaTrack: ct });
  };
}
