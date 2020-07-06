import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { EasyDropdown } from '../GeneralPurposeHelpers/EasyDropdown';
import { ColumnChartTest } from './colGraphComponent';

export class OverviewClientDemand extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      curriculaTrack: '', //EasyDropdown will set this to the first item on component mount
      when: '',
    };
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <h3>Client Demands vs Revature Supply</h3>
          </Col>
        </Row>
        <Row>
          <ColumnChartTest />
        </Row>
        <Row>
          <Col>
            <p>
              The above chart compares all current client demand for any given
              skillset vs what Revature has available to place today, what
              Revature expects to have coming in 1 month, and what is expect in
              3 months time.
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
