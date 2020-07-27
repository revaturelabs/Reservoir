import React, { useState, useEffect } from "react";
import Chart from "react-google-charts";
import {
  getAllCurrentClientDemands,
  getTotalSupply,
} from "../Common/API/clientDemand";
import { getUnconfirmedBatches } from "../Common/API/batch";
import { ClientDemands } from "../../models/ClientDemands";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { GraphData } from "../../models/GraphData";

export default function TestChart() {
  //Have to define/declare my dumb typescript variables
  const [graphData, setGraphData] = useState({
    total_demand: 0,
    committed_1m: 0,
    committed_3m: 0,
    committed_curr: 0,
    committed_supply: 0,
    confirmed_1m: 0,
    confirmed_3m: 0,
    confirmed_curr: 0,
    confirmed_supply: 0,
  });
  const [dropdown, setDropdown] = useState({
    selected: "Select an Unconfirmed Batch",
  });

  const [clients, setClients]: [number[], any] = useState([]);
  const [skillSets, setSkillSet]: [number[], any] = useState([]);
  //these are here temporarily untill we set up the redux store to handle this information
  //ideally this would be used for the final implementation for more concise readability
  const [dropDownOpenClient, setDropDownOpenClient] = useState(false);
  const [dropDownOpenSkill, setDropDownOpenSkill] = useState(false);
  const toggleClient = () =>
    setDropDownOpenClient((prevStateClient) => !prevStateClient);
  const toggleSkill = () =>
    setDropDownOpenSkill((prevSateSkill) => !prevSateSkill);
  const [clientDropItem, setClientDropItem] = useState(0);
  const [skillSetDropItem, setSkillSetDropItem] = useState(0);

  useEffect(() => {
    (async () => {
      //await getTotalDemand();
      await getTotalUnConfirmed();
      await getMatrixTotal();
    })();
  }, []);

  //this is the useEffect associated with getting all of the client names
  useEffect(() => {
    (async () => {
      await getClients();
    })();
  }, [clients]);

  //this is the useEffect associated with getting all of the skill sets
  useEffect(() => {
    (async () => {
      //await enter async function here
    })();
  }, [skillSets]);

  //used to get the client names to store them into state
  async function getClients() {
    //FILL IN CODE HERE - CODING CHALLENEGE
  }

  //used to get the the skill set names so we can put them into state
  async function getSkillSets() {
    //enter the axios function call here
    //FILL IN CODE HERE - CODING CHALLENEGE
  }

  //sets the active drop down for clients
  const selectDropItemForClient = (e: any) => {
    setClientDropItem(e.target.textContent);
  };
  //sets the active drop down for skill sets
  const selectDropItemForSkill = (e: any) => {
    setSkillSetDropItem(e.target.textContent);
  };

  //Uses backend skill matrix to get total demand, total committed and total confirmed split up into 1m, 3m, current and total supply
  //Lots of totals basically
  //Created a use state variable and a ton of object definitions because there are no models for this, prolly one time use, and its effin typescript
  async function getMatrixTotal() {
    let matrix = await getTotalSupply();

    setGraphData({
      ...graphData,
      total_demand: matrix.total_demand,
      committed_1m: matrix.committed_1m,
      committed_3m: matrix.committed_3m,
      committed_curr: matrix.committed_curr,
      committed_supply: matrix.committed_supply,
      confirmed_1m: matrix.confirmed_1m,
      confirmed_3m: matrix.confirmed_3m,
      confirmed_curr: matrix.confirmed_curr,
      confirmed_supply: matrix.confirmed_supply,
    });
  }

  async function getTotalUnConfirmed() {
    let unconfirmed = await getUnconfirmedBatches();
  }

  return (
    <div>
      {
        //this drop down is reserved for the client names otherwise the client names and skill sets become one
        <Dropdown isOpen={dropDownOpenClient} toggle={toggleClient}>
          <DropdownToggle
            data-toggle="dropdown"
            araia-expanded={dropDownOpenClient}
          >
            {clientDropItem ? clientDropItem : "Total"}
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem
              key="All Clients"
              onClick={(e) => selectDropItemForClient(e)}
            >
              All Clients
            </DropdownItem>
            {clients &&
              clients.map((s: any) => {
                return (
                  <DropdownItem
                    key={s}
                    onClick={(e) => selectDropItemForClient(e)}
                  >
                    {s}
                  </DropdownItem>
                );
              })}
          </DropdownMenu>
        </Dropdown>
      }
      {
        <Dropdown isOpen={dropDownOpenSkill} toggle={toggleSkill}>
          <DropdownToggle
            data-toggle="dropdown"
            araia-expanded={dropDownOpenSkill}
          >
            {skillSetDropItem ? skillSetDropItem : "All Skill Sets"}
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem
              key="All Skill Sets"
              onClick={(e) => selectDropItemForSkill(e)}
            ></DropdownItem>
            {skillSets &&
              skillSets.map((s: any) => {
                return (
                  <DropdownItem
                    key={s}
                    onClick={(e) => selectDropItemForSkill(e)}
                  >
                    {s}
                  </DropdownItem>
                );
              })}
          </DropdownMenu>
        </Dropdown>
      }

      <Chart
        width={"80vw"}
        height={"80vh"}
        chartType="BarChart"
        loader={<div>Loading Chart</div>}
        data={[
          ["S&D", "Demand", "Committed", "Confirmed", "Unconfirmed"],
          ["Total Demand", graphData.total_demand, undefined, undefined, 0],
          [
            "Total Supply",
            undefined,
            graphData.committed_supply,
            graphData.confirmed_supply,
            undefined,
          ],
          [
            "Total Available Currently",
            undefined,
            graphData.committed_curr,
            graphData.confirmed_curr,
            undefined,
          ],
          [
            "Total Available in 1 Month",
            undefined,
            graphData.committed_1m,
            graphData.confirmed_1m,
            undefined,
          ],
          [
            "Total Available in 3 Months",
            undefined,
            graphData.committed_3m,
            graphData.confirmed_3m,
            undefined,
          ],
        ]}
        options={{
          title: "Client Demands vs Revature Supply",
          chartArea: { width: "50%" },
          orientation: "horizontal",
          isStacked: true,
          hAxis: {
            title: "Number of Associates",
            minValue: 0,
          },
        }}
        // For tests
        rootProps={{ "data-testid": "3" }}
      />
    </div>
  );
}
