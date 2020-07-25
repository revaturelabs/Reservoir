import React from "react";
import { getAllCurrentClientDemands } from "../Common/API/clientDemand";
import { getActiveAssociates } from "../Common/API/Associate";
import moment from "moment";
import {
  Col,
  Row,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import TestChart from "./test";

export default function ColumnChartTest(){
  return <TestChart />
}

// export class ColumnChartTest extends React.Component<any, any> {
//   private myRef: any;
//   constructor(props: any) {
//     super(props);
//     this.myRef = React.createRef();
//     this.state = {
//       shouldUpdate: false,
//       current: 0,
//       shouldRunInit: false,
//       clientDemand: new Map(),
//       supply: new Map(),
//       dropdownOptions: ["All Skillsets"],
//       dropdownOpen: false,
//       currentSelected: undefined,
//       clientOptions: ["All Clients"],
//     };
//   }

//   async componentDidMount() {
//     this.setState({
//       clientDemand: await this.getDemand(),
//       supply: await this.getSupply(),
//     });
//     this.loadGoogle();
//   }

//   shouldComponentUpdate(nextProps: any, nextState: any) {
//     if (this.state.shouldUpdate) {
//       this.setState({
//         shouldUpdate: false,
//       });
//       return true;
//     } else {
//       return nextProps != this.props || this.state != nextProps.state;
//     }
//   }

//   componentDidUpdate() {
//     if (this.state.shouldRunInit) {
//       this.init();
//       this.setState({
//         shouldRunInit: false,
//       });
//     }
//   }

//   getDemand = async () => {
//     let demandArr = await getAllCurrentClientDemands();
//     // Create client demand data that has skillsetname : #
//     let clientDemandData = new Map();
//     // map through array of demands to add skillset & quantity to obj
//     let names: any = [];
//     demandArr.forEach((cl: any) =>{
//       const name = cl.clientId;
//       if (!names.includes(name))
//       names.push(name);
//     })
//     this.setState({
//       clientOptions: ["All Clients", ...names]
//     })
//     demandArr.map((cl: any) => {
//       let skillset = cl.skillsetName;
//       let quantity = cl.quantity;
//       // Check to see if skillset is already in object, and if so
//       // add the quantity to the existing quantity
//       if (!clientDemandData.has(skillset)) {
//         clientDemandData.set(skillset, quantity);
//       } else {
//         clientDemandData.set(
//           skillset,
//           clientDemandData.get(skillset) + quantity
//         );
//       }
//     });
//     return clientDemandData;
//   };

//   getSupply = async () => {
//     // 1) get data from api associate (skillset and batch graduation date) {associateId: 2, associateName: 'Tom', Skillset: {skillsetId: 1, name: 'Java/react'}}
//     let supplyArr = await getActiveAssociates();
//     // 2) pass each associate through loop that says:   gd=graduation date [{java/react: current}, {java/react: onemonth}, {salesforce: current}]
//     let supplyData = new Map();
//     let today = moment().format("YYYY-MM-DD");
//     let oneMonthFromToday = moment()
//       .month(moment().month() + 1)
//       .format("YYYY-MM-DD");
//     let threeMonthsFromToday = moment()
//       .month(moment().month() + 3)
//       .format("YYYY-MM-DD");
//     supplyArr.map((a: any) => {
//       if (a.batch != null) {
//         let skillset = a.batch.curriculum.curriculumSkillset.skillSetName;
//         let batchDate = moment(a.batch.endDate).format("YYYY-MM-DD");
//         if (!supplyData.has(skillset)) {
//           // Skillset Name doesn't exist yet in supplyData Map
//           // If the batch end date associate is in is today or earlier, create
//           // an element in the Map for the skillset adding 1 to the count of 'current'
//           if (batchDate <= today) {
//             supplyData.set(skillset, {
//               current: 1,
//               oneMonth: 0,
//               threeMonths: 0,
//             });
//             // If the batch end date associate is in is after today and within a month
//             // create an element in the Map for the skillset adding 1 to the count of 'oneMonth'
//           } else if (batchDate > today && batchDate <= oneMonthFromToday) {
//             supplyData.set(skillset, {
//               current: 0,
//               oneMonth: 1,
//               threeMonths: 0,
//             });
//             // If the batch end date associate is a month from now and within 3 months from now,
//             // create an element in the Map for the skillset adding 1 to the count of 'threeMonths'
//           } else if (
//             batchDate > oneMonthFromToday &&
//             batchDate <= threeMonthsFromToday
//           ) {
//             supplyData.set(skillset, {
//               current: 0,
//               oneMonth: 0,
//               threeMonths: 1,
//             });
//           }
//         } else {
//           // Skillset Name is already in the supplyData Map
//           // Depending on associate's batch's end date, add 1 to the count corresponding with their
//           // timeframe
//           if (batchDate <= today) {
//             let timeObj = supplyData.get(skillset);
//             supplyData.set(skillset, {
//               ...timeObj,
//               current: timeObj.current ? timeObj.current + 1 : 1,
//             });
//           } else if (batchDate > today && batchDate <= oneMonthFromToday) {
//             let timeObj = supplyData.get(skillset);
//             supplyData.set(skillset, {
//               ...timeObj,
//               oneMonth: timeObj.oneMonth ? timeObj.oneMonth + 1 : 1,
//             });
//           } else if (
//             batchDate > oneMonthFromToday &&
//             batchDate <= threeMonthsFromToday
//           ) {
//             let timeObj = supplyData.get(skillset);
//             supplyData.set(skillset, {
//               ...timeObj,
//               threeMonths: timeObj.threeMonths ? timeObj.threeMonths + 1 : 1,
//             });
//           }
//         }
//       }
//     });
//     return supplyData;
//   };

//   // This initializes google charts
//   loadGoogle = () => {
//     google.charts.load("current", { packages: ["corechart", "bar"] });
//     google.charts.setOnLoadCallback(this.init);
//   };

//   createTotal = (dem: any, sup: any) => {
//     let totals = {
//       demandTotal: 0,
//       currTotal: 0,
//       oneMonthTotal: 0,
//       threeMonthTotal: 0,
//     };
//     sup.forEach((v: any, k: any, m: any) => {
//       totals.currTotal = totals.currTotal + v.current;
//       totals.oneMonthTotal = totals.oneMonthTotal + v.oneMonth;
//       totals.threeMonthTotal = totals.threeMonthTotal + v.threeMonths;
//     });

//     dem.forEach((v: any, k: any, m: any) => {
//       totals.demandTotal = totals.demandTotal + v;
//     });
//     console.log("Totals obj: ", totals);
//     return totals;
//   };

//   // This can be used to loop through data to create all tables necessary
//   createTableData = (demandArr: any, supplyArr: any) => {
//     let supply = supplyArr;
//     let demand = demandArr;
//     let totalsObj = this.createTotal(demand, supply);
//     let demKey = demand.keys();
//     this.setState({
//       dropdownOptions: ["All Skillsets", ...Array.from(demand.keys())],
//     });
//     let data: any[] = [];
//     let view: any[] = [];

//     ////////////////////////
//     data.push(new google.visualization.DataTable());
//     data[0].addColumn("string", "Demand and Supply");
//     data[0].addColumn("number", "Total");
//     let dataa: any = [];
//     dataa.push(
//       ["Total Demand", totalsObj.demandTotal],
//       [
//         "Total Supply",
//         totalsObj.currTotal +
//           totalsObj.oneMonthTotal +
//           totalsObj.threeMonthTotal,
//       ],
//       ["Total Currently Available", totalsObj.currTotal],
//       ["Total Available in 1 Month", totalsObj.oneMonthTotal],
//       ["Total Available in 3 Months", totalsObj.threeMonthTotal]
//     );
//     data[0].addRows(dataa);
//     view[0] = new google.visualization.DataView(data[0]);
//     //////////////////////////////

//     for (let i = 1; i < demand.size + 1; i++) {
//       let thisDemKey = demKey.next().value;
//       let supVals = supply.get(thisDemKey);
//       data.push(new google.visualization.DataTable());
//       data[i].addColumn("string", "Demand and Supply");
//       data[i].addColumn("number", thisDemKey);
//       let dataRows: any = [];
//       dataRows.push(["Client Demand", demand.get(thisDemKey)]);
//       if (supVals !== undefined || (supVals && supVals.current !== 0)) {
//         dataRows.push(["Currently Available", supVals.current]);
//       } else {
//         dataRows.push(["Currently Available", 0]);
//       }
//       if (supVals !== undefined || (supVals && supVals.oneMonth !== 0)) {
//         dataRows.push(["Available in 1 Month", supVals.oneMonth]);
//       } else {
//         dataRows.push(["Available in 1 Month", 0]);
//       }
//       if (supVals !== undefined || (supVals && supVals.threeMonths !== 0)) {
//         dataRows.push(["Available in 3 Months", supVals.threeMonths]);
//       } else {
//         dataRows.push(["Available in 3 Months", 0]);
//       }
//       data[i].addRows(dataRows);
//       view[i] = new google.visualization.DataView(data[i]);
//     }
//     return view;
//   };

//   // // Method to create a chart/table
//   init = async () => {
//     let demArr = this.state.clientDemand;
//     let supArr = this.state.supply;
//     let googleView = this.createTableData(demArr, supArr);
//     // Labeling and styling
//     var options: any = {
//       orientation: "horizontal",
//       width: 1000,
//       column: 0,
//       height: 500,
//       isStacked: true,
//       hAxis: {
//         direction: 1,
//       },
//       vAxes: {
//         0: { title: "Amount of Associates" },
//       },
//       hAxes: {
//         0: { title: "Demand and Supply Timeline" },
//       },
//     };
//     this.drawChart(
//       googleView,
//       options,
//       this.state.current
//         ? this.state.dropdownOptions.indexOf(this.state.current)
//         : 0
//     );
//     // This is what actually creates the tables
//     // Updates componment once chart is drawn
//     this.setState({
//       shouldUpdate: true,
//     });
//   };

//   drawChart = (view: any[], options: any, index: number) => {
//     // myRef acts like .getElementById but for React
//     var chart = new google.visualization.BarChart(this.myRef.current);
//     chart.draw(view[index], options);
//   };

//   setTableView = (skill: string) => {
//     this.setState({
//       current: skill,
//       shouldRunInit: true,
//       shouldUpdate: true,
//     });
//   };

//   toggle = (e: any) => {
//     this.setState({
//       dropdownOpen: !this.state.dropdownOpen,
//     });
//   };

//   clientToggle = (e: any) => {
//     this.setState({
//       clientDropdownOpen: !this.state.clientDropdownOpen,
//     });
//   };

//   setSelected = (e: any) => {
//     this.setState({
//       currentSelected: e.currentTarget.innerText,
//       current: e.currentTarget.innerText,
//       shouldRunInit: true,
//       shouldUpdate: true,
//     });
//   };

//   setClientSelected = (e: any) => {
//     this.setState({
//       clientSelected: e.currentTarget.innerText,
//       shouldRunInit: true,
//       shouldUpdate: true,
//     });
//   }
//   render() {
//     return <TestChart></TestChart>
//   }
// }
// //     return (
// //       <>
// //         <Col>
// //           <Row>
// //             <Col>
// //               <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
// //                 <DropdownToggle caret>
// //                   {this.state.currentSelected
// //                     ? this.state.currentSelected
// //                     : "Select Skillset"}
// //                 </DropdownToggle>
// //                 <DropdownMenu>
// //                   {this.state.dropdownOptions &&
// //                     this.state.dropdownOptions.map((s: any) => {
// //                       return (
// //                         <DropdownItem key={s} onClick={this.setSelected}>
// //                           {s}
// //                         </DropdownItem>
// //                       );
// //                     })}
// //                 </DropdownMenu>
// //               </Dropdown>
// //             </Col>
// //             <Col>
// //               <Dropdown isOpen={this.state.clientDropdownOpen} toggle={this.clientToggle}>
// //                 <DropdownToggle caret>
// //                   {this.state.clientSelected
// //                     ? this.state.clientSelected
// //                     : "Select Client"}
// //                 </DropdownToggle>
// //                 <DropdownMenu>
// //                   {this.state.clientOptions &&
// //                     this.state.clientOptions.map((s: any) => {
// //                       return (
// //                         <DropdownItem key={s} onClick={this.setClientSelected}>
// //                           {s}
// //                         </DropdownItem>
// //                       );
// //                     })}
// //                 </DropdownMenu>
// //               </Dropdown>
// //             </Col>
// //           </Row>
// //           <Row>
// //             <Col className="center-items-div">
// //               <div ref={this.myRef} />
// //             </Col>
// //           </Row>
// //         </Col>
// //       </>
// //     );
// //   }
// // }

// // Method to create a SINGLE chart/table //
// // drawChart = () => {
// //   // Creating a data obj for our table
// //   var data = new google.visualization.DataTable();
// //   // Number Columns represent each type of data - 5 total
// //   // String column represent a title
// //   data.addColumn('string', 'Demand and Supply');
// //   data.addColumn('number', 'Total');
// //   data.addColumn('number', 'Java/React');
// //   data.addColumn('number', 'Salesforce');
// //   data.addColumn('number', 'Data');
// //   data.addColumn('number', 'Ai');
// //   // Each array is a grouping of the above columns
// //   data.addRows([
// //     ['Client Demand', 64, 23, 21, 16, 4],
// //     ['Current', 19, 4, 6, 8, 1],
// //     ['1 Month', 31, 10, 12, 6, 3],
// //     ['3 Months', 50, 20, 15, 10, 5],
// //   ]);

// //   // Creates view with data?????????
// //   var view = new google.visualization.DataView(data);
// //   view.setRows([0, 1, 2, 3]);

// //   // Labeling and styling
// //   var options: any = {
// //     orientation: 'horizontal',
// //     width: 900,
// //     column: 0,
// //     height: 500,
// //     hAxis: {
// //       direction: 1,
// //     },
// //     vAxes: {
// //       0: { title: 'Amount of Associates' },
// //     },
// //     hAxes: {
// //       0: { title: 'Demand and Supply' },
// //     },
// //   };

// //   // myRef acts like .getElementById but for React
// //   var chart = new google.visualization.BarChart(this.myRef.current);
// //   // This is what actually creates the tables
// //   // })
// //   chart.draw(view, options);
// //   // Updates componment once chart is drawn
// //   this.setState({
// //     shouldUpdate: true,
// //   });
// // };