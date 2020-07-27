import React from "react";
import "./App.css";
import "./stylesheets/generate-batches/overviewtraining.css"

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  Link,
} from "react-router-dom";

import { ReduxInProgress } from "./Components/Batches-in-progress/BatchesInProgressView";
import {
  Navbar,
  Nav,
  Container,
  NavbarBrand,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";
import { OverviewClientDemand } from "./Components/Supply-demand/OverviewClientDemand";
import { OverviewTraining } from "./Components/Generate-batches/OverviewTraining";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { ViewConsentRequests } from "./Components/Currently-unused/ViewConsentRequests";
import { HomePage } from "./Components/Currently-unused/homepage";
import { PageFooter } from "./Components/Common/Footer/footer";

export class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      isBatchOpen: false,
      isTrainerOpen: false,
    };
  }

  toggleBatches = () => {
    this.setState({
      isBatchOpen: !this.state.isBatchOpen,
      isTrainerOpen: false,
    });
  };

  toggleTrainers = () => {
    this.setState({
      isTrainerOpen: !this.state.isTrainerOpen,
      isBatchOpen: false,
    });
  };

  /*  
    returns a jsx component with the navbar and endpoint routes.
    creates that stuff from the array of endpoints and nav names
*/
  createRoutesAndNavbar = (array: any) => {
    return (
      <Router>
        <div className="main-container">
          <Navbar color="light" light expand="md">
            {array.map((navEnd: any) => {
              if (navEnd.end === "/home") {
                return (
                  <NavbarBrand
                    key={navEnd.name}
                    href={navEnd.end}
                    className="nav-link"
                    activeClassName="active"
                  >
                    {navEnd.name}
                  </NavbarBrand>
                );
              }
            })}
            <Nav className="mr-auto" navbar>
              <UncontrolledDropdown
                isOpen={this.state.isBatchOpen}
                toggle={this.toggleBatches}
                onClick={this.toggleBatches}
                nav
                inNavbar
              >
                <DropdownToggle nav caret>
                  Batches
                </DropdownToggle>
                <DropdownMenu>
                  {array.map((navEnd: any) => {
                    if (navEnd.end.indexOf("/batch") > -1) {
                      return (
                        <>
                          <Link
                            to={navEnd.end}
                            className="nav-link"
                            key={navEnd.end}
                          >
                            {navEnd.name}
                          </Link>
                        </>
                      );
                    }
                  })}
                </DropdownMenu>
              </UncontrolledDropdown>
              {/* <UncontrolledDropdown
                isOpen={this.state.isTrainerOpen}
                onClick={this.toggleTrainers}
                toggle={this.toggleTrainers}
                nav
                inNavbar
              >
                <DropdownToggle nav caret>
                  Trainers
                </DropdownToggle>
                <DropdownMenu>
                  {array.map((navEnd: any) => {
                    if (navEnd.end.indexOf("/trainers") > -1) {
                      return (
                        <Link
                          to={navEnd.end}
                          className="nav-link"
                          key={navEnd.end}
                        >
                          {navEnd.name}
                        </Link>
                      );
                    }
                  })}
                </DropdownMenu>
              </UncontrolledDropdown> */}
            </Nav>
          </Navbar>
          <Switch>
            <Provider store={store}>
              <Container className="wrapping-container">
                <Route exact path="/">
                  <Redirect to="/home" />
                </Route>
                {array.map((navEnd: any) => {
                  return (
                    <Route key={navEnd.name} path={navEnd.end}>
                      {navEnd.comp}
                    </Route>
                  );
                })}
                <Route exact path="*">
                  <Redirect to="/home" />
                </Route>
              </Container>
            </Provider>
          </Switch>
          <PageFooter />
        </div>
      </Router>
    );
  };

  render() {
    return (
      <>
        {
          /*
            Generate all the navbar items and routes from the given json

            end:  is the /endpoint in the url
            name: is displayed in the navbar to look nice
            comp: is the component to display within the route
          */
          this.createRoutesAndNavbar([
            // --------------------MOVED TO CURRENTLY-UNUSED BY TEAM C------------------------
            // {
            //   end: "/dead-page",
            //   name: "Reservoir",
            //   comp: <HomePage />,
            // },
            {
              end: "/home",
              name: "Reservoir",
              comp: <ReduxInProgress />,
            },
            {
              end: "/batch/demand-overview",
              name: "Supply & Demand",
              comp: <OverviewClientDemand />,
            },
            {
              end: "/batch/training-overview",
              name: "Generate Batches",
              comp: <OverviewTraining />,
            },
            {
              end: "/batch/batches-in-progress",
              name: "Batches in Progress",
              comp: <ReduxInProgress />,
            },
            // {
            //   end: "/trainer-assign",
            //   name: "Trainer assignment",
            //   comp: <TrainerAssignmentComponent />,
            // },
            // --------------------MOVED TO CURRENTLY-UNUSED BY TEAM C------------------------
            // {
            //   end: "/trainers/consent-requests",
            //   name: "Consent requests",
            //   comp: <ViewConsentRequests />,
            // },
            // {
            //   end: "/test-convert",
            //   name: "TCO",
            //   comp: <TestConvertToObject />,
            // },
            // { end: "/test-ASTable", name: "BTT", comp: <BatchTableTester /> },
          ])
        }
      </>
    );
  }
}

export default App;
