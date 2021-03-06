import React, { useState, useEffect } from "react";
import Chart from "react-google-charts";
import { getTotalSupply, getFilteredSupply } from "../Common/API/clientDemand";
import { getUnconfirmedBatches, getBatchById } from "../Common/API/batch";
import { ClientDemands } from "../../models/ClientDemands";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Row,
  Col,
} from "reactstrap";
import { axiosClient } from "../Common/API/axios";

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
    unconfirmed_1m: null,
    unconfirmed_3m: null,
    unconfirmed_curr: null,
    unconfirmed_supply: null,
    crossover: null, //crossover variable of skillset and batches unconfirmed
  });
  const [dropdown, setDropdown] = useState({
    selected: "Select an Unconfirmed Batch",
  });

  //all state varialbes for all 3 dropdowns

  const [clients, setClients]: [any[], any] = useState([]);
  const [skillSets, setSkillSet]: [any[], any] = useState([]);

  const [dropDownOpenClient, setDropDownOpenClient] = useState(false);
  const [dropDownOpenSkill, setDropDownOpenSkill] = useState(false);
  const [dropdownOpenUnconfirmed, setDropdownOpenUnconfirmed] = useState(false);

  const [clientDropdownId, setClientDropdownId] = useState(0);
  const [skillsetDropdownId, setSkillsetDropdownId] = useState(0);
  const [unconfirmedDropdownId, setUnconfirmedDropdownId] = useState(0);
  const [skillMatch, setSkillMatch] = useState({});

  const toggleClient = () =>
    setDropDownOpenClient((prevStateClient) => !prevStateClient);
  const toggleSkill = () =>
    setDropDownOpenSkill((prevStateSkill) => !prevStateSkill);
  const toggleUnConfirmed = () =>
    setDropdownOpenUnconfirmed((prevStateSkill) => !prevStateSkill);

  const [clientDropItem, setClientDropItem] = useState(undefined);
  const [skillSetDropItem, setSkillSetDropItem] = useState(undefined);
  const [unconfirmedDropItem, setUnconfirmedDropItem] = useState(undefined);

  //For unconfirmed batch data specific
  const [dropdownUnconfirmed, setDropdownUnconfirmed] = useState([0]);
  const [dataUnconfirmed, setDataUnconfirmed]: any = useState();

  //Use Effect one
  useEffect(() => {
    (async () => {
      //await getTotalDemand();
      await getTotalUnConfirmed();
      await getMatrixTotal();
      await getClients();
      await getSkillSets();
    })();
  }, []);

  //Use Effect two
  useEffect(() => {
    (async () => {
      await getMatrixTotal();
      //batchInfo(unconfirmedDropdownId);
      //console.log(`calling filter`);
    })();
  }, [skillSetDropItem, clientDropItem, unconfirmedDropItem]);

  //used to get the client names to store them into state
  async function getClients() {
    let objs: any[] = (await axiosClient.get("/clients")).data;
    setClients(objs);
  }

  //used to get the the skill set names so we can put them into state
  async function getSkillSets() {
    let objs: any[] = (await axiosClient.get("/skillsets")).data;
    setSkillSet(objs);
  }

  //sets the active drop down for clients
  const selectDropItemForClient = (e: any) => {
    setClientDropItem(e.target.textContent);
    setClientDropdownId(e.target.value);
  };
  //sets the active drop down for skill sets
  //Logic for unconfirmed backend
  const selectDropItemForSkill = (e: any) => {
    setSkillSetDropItem(e.target.textContent);
    setSkillsetDropdownId(e.target.value);

    if (skillMatch === e.target.textContent || !e.target.value) {
      console.log("Match!");
      setGraphData({
        ...graphData,
        unconfirmed_supply: graphData.crossover,
      });
    } else {
      console.log("NoMatch!");
      setGraphData({
        ...graphData,
        unconfirmed_supply: null,
      });
    }
  };

  const selectDropItemForUnconfirmed = (e: any) => {
    setUnconfirmedDropItem(e.target.textContent);
    setUnconfirmedDropdownId(e.target.value);
    batchInfo(e.target.value);
  };

  //Uses backend skill matrix to get total demand, total committed and total confirmed split up into 1m, 3m, current and total supply
  //Lots of totals basically
  //Created a use state variable and a ton of object definitions because there are no models for this, prolly one time use, and its effin typescript
  async function getMatrixTotal() {
    let matrix;
    if (clientDropdownId || skillsetDropdownId)
      matrix = await getFilteredSupply(clientDropdownId, skillsetDropdownId);
    else matrix = await getTotalSupply();

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

  ///////////Unconfirmed Batch Data
  async function getTotalUnConfirmed() {
    let dropdown = [];
    let unconfirmed = await getUnconfirmedBatches();
    setDataUnconfirmed([unconfirmed]);

    for (let i = 0; i < unconfirmed.length; i++) {
      dropdown[i] = unconfirmed[i].batch_id;
    }
    setDropdownUnconfirmed(dropdown);
  }

  function batchInfo(id: number) {
    let batchID, batchDate, batchCap, batchSkill;

    if (dataUnconfirmed) {
      for (let i = 0; i < dataUnconfirmed[0].length; i++) {
        if (id == dataUnconfirmed[0][i].batch_id) {
          batchID = dataUnconfirmed[0][i].batch_id;
          batchDate = dataUnconfirmed[0][i].start_date;
          batchCap = dataUnconfirmed[0][i].batch_capacity;
          batchSkill = dataUnconfirmed[0][i].skillSetName;
          setSkillMatch(batchSkill);
        }
      }

      //////Skillset Matching to unconfirmed batch Logic
      if (!skillsetDropdownId || batchSkill === skillSetDropItem) {
        setGraphData({
          ...graphData,
          crossover: batchCap,
          unconfirmed_supply: batchCap,
        });
      } else {
        setGraphData({
          ...graphData,
          unconfirmed_supply: null,
        });
      }
    }
  }

  //RENDERRRR
  return (
    <div>
      <Col>
        <Row>
          <Col className="center-items-div">
            <Dropdown isOpen={dropDownOpenClient} toggle={toggleClient}>
              <DropdownToggle
                caret
                className="viewOrangeBtn"
                data-toggle="dropdown"
                araia-expanded={dropDownOpenClient}
              >
                {clientDropItem ? clientDropItem : "All Clients"}
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
                        value={s.clientId}
                        onClick={(e) => selectDropItemForClient(e)}
                      >
                        {s.name}
                      </DropdownItem>
                    );
                  })}
              </DropdownMenu>
            </Dropdown>
          </Col>
          <Col className="center-items-div">
            <Dropdown isOpen={dropDownOpenSkill} toggle={toggleSkill}>
              <DropdownToggle
                caret
                className="viewOrangeBtn"
                data-toggle="dropdown"
                araia-expanded={dropDownOpenSkill}
              >
                {skillSetDropItem ? skillSetDropItem : "All Skill Sets"}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem
                  key="All Skill Sets"
                  onClick={(e) => selectDropItemForSkill(e)}
                >
                  All Skill Sets
                </DropdownItem>
                {skillSets &&
                  skillSets.map((s: any) => {
                    return (
                      <DropdownItem
                        value={s.skillSetId}
                        onClick={(e) => selectDropItemForSkill(e)}
                      >
                        {s.name}
                      </DropdownItem>
                    );
                  })}
              </DropdownMenu>
            </Dropdown>
          </Col>
          <Col>
            <Dropdown
              isOpen={dropdownOpenUnconfirmed}
              toggle={toggleUnConfirmed}
            >
              <DropdownToggle
                caret
                className="viewOrangeBtn"
                data-toggle="dropdown"
              >
                {unconfirmedDropItem
                  ? unconfirmedDropItem
                  : "Unconfirmed Batches"}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem
                  key="No Unconfirmed"
                  onClick={(e) => selectDropItemForUnconfirmed(e)}
                >
                  No Batch Selected
                </DropdownItem>
                {dropdownUnconfirmed &&
                  dropdownUnconfirmed.map((s: any) => {
                    return (
                      <DropdownItem
                        value={s}
                        onClick={(e) => selectDropItemForUnconfirmed(e)}
                      >
                        Batch {s}
                      </DropdownItem>
                    );
                  })}
              </DropdownMenu>
            </Dropdown>
          </Col>
        </Row>
      </Col>

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
            graphData.unconfirmed_supply,
          ],
          [
            "Total Available Currently",
            undefined,
            graphData.committed_curr,
            graphData.confirmed_curr,
            graphData.unconfirmed_curr,
          ],
          [
            "Total Available in 1 Month",
            undefined,
            graphData.committed_1m,
            graphData.confirmed_1m,
            graphData.unconfirmed_1m,
          ],
          [
            "Total Available in 3 Months",
            undefined,
            graphData.committed_3m,
            graphData.confirmed_3m,
            graphData.unconfirmed_3m,
          ],
        ]}
        options={{
          title: "Client Demands vs Revature Supply",
          chartArea: { left: "auto", width: "50%" },
          orientation: "horizontal",
          isStacked: true,
          hAxis: {
            title: "Number of Associates",
            minValue: 0,
          },
          series: {
            0: { color: "#F26925" },
            1: { color: "#FCB414" },
            2: { color: "#72A4C2" },
            3: { color: "#474C55" },
          },
        }}
        // For tests
        rootProps={{ "data-testid": "3" }}
      />
    </div>
  );
}
