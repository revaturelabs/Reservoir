import React, { useState, useEffect } from "react";
import axios from 'axios'
import Chart from "react-google-charts";
import {
    getAllCurrentClientDemands,
    getTotalSupply,
    getFilteredSupply
} from "../Common/API/clientDemand";
import { getUnconfirmedBatches } from "../Common/API/batch";
import { ClientDemands } from "../../models/ClientDemands";
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Row,
    Col,
} from "reactstrap";
import { GraphData } from "../../models/GraphData";
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
    });
    const [dropdown, setDropdown] = useState({
        selected: "Select an Unconfirmed Batch",
    });

    const [clients, setClients]: [any[], any] = useState([]);
    const [skillSets, setSkillSet]: [any[], any] = useState([]);
    //these are here temporarily untill we set up the redux store to handle this information
    //ideally this would be used for the final implementation for more concise readability
    const [dropDownOpenClient, setDropDownOpenClient] = useState(false);
    const [dropDownOpenSkill, setDropDownOpenSkill] = useState(false);
    const [clientDropdownId, setClientDropdownId] = useState(0);
    const [skillsetDropdownId, setSkillsetDropdownId] = useState(0);
    const toggleClient = () =>
        setDropDownOpenClient((prevStateClient) => !prevStateClient);
    const toggleSkill = () =>
        setDropDownOpenSkill((prevSateSkill) => !prevSateSkill);
    const [clientDropItem, setClientDropItem] = useState(undefined);
    const [skillSetDropItem, setSkillSetDropItem] = useState(undefined);

    useEffect(() => {
        (async () => {
            //await getTotalDemand();
            await getTotalUnConfirmed();
            await getMatrixTotal();
            await getClients();
            await getSkillSets();
        })();
    }, []);

    useEffect(()=>{
        (async () => {
            await getMatrixTotal();
            console.log(`calling filter`);
        })();
    },[skillSetDropItem, clientDropItem])

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
    const selectDropItemForSkill = (e: any) => {
        setSkillSetDropItem(e.target.textContent);
        setSkillsetDropdownId(e.target.value);
    };

    //Uses backend skill matrix to get total demand, total committed and total confirmed split up into 1m, 3m, current and total supply
    //Lots of totals basically
    //Created a use state variable and a ton of object definitions because there are no models for this, prolly one time use, and its effin typescript
    async function getMatrixTotal() {
        let matrix;
        if(clientDropdownId || skillsetDropdownId)
            matrix = await getFilteredSupply(clientDropdownId, skillsetDropdownId);
        else
            matrix = await getTotalSupply();

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
        <Col>
            <Row>
                <Col className="center-items-div">
                    <Dropdown isOpen={dropDownOpenClient} toggle={toggleClient}>
                        <DropdownToggle
                            caret className="viewOrangeBtn"
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
                                })
                            }
                        </DropdownMenu>
                    </Dropdown>
                </Col>
                <Col className="center-items-div">
                    <Dropdown isOpen={dropDownOpenSkill} toggle={toggleSkill}>
                        <DropdownToggle
                            caret className="viewOrangeBtn"
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
                                })
                            }
                        </DropdownMenu>
                    </Dropdown>
                </Col>
            </Row>

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
        </Col>
    );
}
