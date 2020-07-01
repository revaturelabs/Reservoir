import React from "react";
//npm install react-calendar
//npm i @types/react-calendar
import Calendar from 'react-calendar';
import './Calendar.css';
import './Table.css';
import { Row, Col, Table, Container, Button } from "reactstrap";
import { EasyDropdown } from "../GeneralPurposeHelpers/EasyDropdown";
import { prnt } from "../GeneralPurposeHelpers/Prnt";
import { dateDifferenceWeeks } from "../GeneralPurposeHelpers/dateDifferenceWeeks";
import { TimelineComponent, TimelineRedux } from "./Timeline";
import { axiosClient } from "../api/axios";
import { ErrorAlert } from "../GeneralPurposeHelpers/ErrorAlert";
import { Batch } from "../models/Batch";
import { trainerGetName } from "../models/Trainer";
import { associatesGetActiveTotal } from "../models/Associate";
import { locationGetName } from "../models/Location";
import { seeIt } from "../GeneralPurposeHelpers/seeIt";
import { connect } from 'react-redux';
import { allTheActionMappers, batchClickActionMapper } from "../redux/action-mapper";
import { IState, allTheMapStateToProps } from "../redux/reducers";
import {pseudoDataResponse}  from "../PseudoData/convertJsonToObjects";
import { getAllBatches } from "../api/batch";
import { FilterForm } from "./FilterForm";

const doPrnt=true//prnt will work

export class InProgress extends React.Component<any,any>
{
	constructor(props:any)
	{
		super(props)
		this.state={
		programType:'(none)',		//EasyDropdown will set this to its first item during render
		//workType:   '',
		viewType:   '',
		sortAscend:	true,		//sorts by ascending or decending
		error:		null,		//holds an axios error object that will be displayed
		batchDisplayData:[],	//holds the batch data formatted for display
		batches: [], // batch data to be passed as a prop
		filteredBatches: [],
		client: '(none)',
		curriculum: '(none)',
		programTypesArray:[]
		
		}
	}

	render()
	{
		return(<Container>
				<ErrorAlert error={this.state.error}/>
				<h6>Story 1. "In Progress"</h6><br/>
				<p>Given that batches are currently in operation
When I navigate to the 'In Progress' view
And I optionally select Program Type (ROCP, CF, Standard, Spark) or Curricula or client
Then I see current week, weeks remaining, number of active/inactive associates, trainer, location filtered by criteria
And this data is shown as a table and a Calendar view</p><br/>
				<Row>
					<Col>
					<Button onClick={this.reset}>Reset</Button>
					</Col>
					<Col>
						<b>program type</b>
						<EasyDropdown onSelected={this.setProgramType}  items={['(none)','CF','ROCP',  'Standard', 'Spark']}/>
					</Col>

					<Col>
						<b>client</b>
						<EasyDropdown onSelected={this.setClient}  items={['(none)','Walmart','Amazon']}  />
					</Col>

					<Col>
						<b>curriculum</b>
						<EasyDropdown onSelected={this.setCurriculum} items={['(none)','curriculum1','curriculum2']} />
					</Col>

					<Col>
						<b>view type:</b>
						<EasyDropdown onSelected={this.setViewType}     items={['Table','Calendar']} />
					</Col>
					{/* <FilterForm setProgramType={this.setProgramType} setClient={this.setClient} setCurriculum={this.setCurriculum} applyFilters={this.applyFilters}/> */}
				</Row>
				<br/>
				<br/>
				{/* {	this.state.viewType==='Table'?this.displayTheDataAsATable():<TimelineComponent batches={this.state.batchDisplayData}/>	} */}
				{	this.state.viewType==='Table'?this.displayTheDataAsATable():<TimelineRedux batches={this.state.filteredBatches}/>	}
				{/* {this.state.viewType!=='Table'&&<TimelineComponent/>} */}
		</Container>)
	}


	reset=()=>{
		console.log("helsf")
		let batch=this.state.batches;
		console.log(batch)
		this.setState({
			filteredBatches:batch,
			batchDisplayData: this.convertServerDataToDisplayData(batch),
		})
	}

	displayTheDataAsATable=()=>
	{
		return(
			<Table bordered>
				<thead>
					<tr>
						<th></th>
						<th onClick={()=>this.sortBatches('id')}>id</th>
						{/* <th onClick={()=>this.sortBatches('name')}>name</th> */}
						<th onClick={()=>this.sortBatches('dateSortStart')}>Start Date</th>
						<th onClick={()=>this.sortBatches('dateSortEnd')}>End Date</th>
						<th onClick={()=>this.sortBatches('weekSortCurrent')}>Current Week</th>
						<th onClick={()=>this.sortBatches('weekSortRemaining')}>Remaining Weeks</th>
						<th onClick={()=>this.sortBatches('skillset')}>Skillset</th>
						<th onClick={()=>this.sortBatches('associatesActive')}>Active Associates</th>
						<th onClick={()=>this.sortBatches('associatesInactive')}>Inactive Associates</th>
						<th onClick={()=>this.sortBatches('trainer')}>Trainer</th>
						<th onClick={()=>this.sortBatches('location')}>Location</th>
					</tr>
				</thead>
				<tbody>
					{
						this.state.batchDisplayData.map((batch:any)=>
						{
							return(
							<tr>
								<td>
									<Button onClick={
											()=>{
												this.props.batchClickActionMapper(batch.batchFromServer)
											}
										}>View
									</Button>
								</td>
								<td>{batch.id}</td>
								{/* <td>{batch.name}</td> */}
								<td>{batch.dateStartText}</td>
								<td>{batch.dateEndText}</td>
								<td>{batch.jsxWeekCurrent}</td>
								<td>{batch.jsxWeekRemaining}</td>
								<td>{batch.skillset}</td>
								<td>{batch.associatesActive}</td>
								<td>{batch.associatesInactive}</td>
								<td>
								{
									batch.trainers.map((trainer:any)=>
									{
										return(<>{trainer.firstName}<br/></>)
									})
								
								}
								</td>
								<td>{batch.location}</td>
							</tr>)
						})
					}
				</tbody>
			</Table>
		)
	}

	displayDataAsCalendar=()=>
	{
		return(
			this.state.batchDisplayData.map((batch:any)=>
			{
				//return(<Row>{batch.dateStart} {batch.dateEnd}</Row>)
				return(<>
					<Row>
						<Col sm={4}>
							<Calendar value={[batch.dateStart,batch.dateEnd]}
								defaultActiveStartDate= {new Date(Date.now())}
								calendarType="US"
								/>
						
						</Col>
						<Col>
							<Row><Col sm={3}>id</Col><Col>{batch.id}</Col></Row>
							{/* <Row><Col sm={3}>name</Col><Col>{batch.name}</Col></Row> */}
							<Row><Col sm={3}>Week current</Col><Col>{batch.jsxWeekCurrent}</Col></Row>
							<Row><Col sm={3}>Weeks remaining</Col><Col>{batch.jsxWeekRemaining}</Col></Row>
							<Row><Col sm={3}>Skillset</Col><Col>{batch.skillset}</Col></Row>
							<Row><Col sm={3}>Associates Active</Col><Col>{batch.associatesActive}</Col></Row>
							<Row><Col sm={3}>Associates Inactive</Col><Col>{batch.associatesInactive}</Col></Row>
							<Row><Col sm={3}>Trainer</Col><Col>{batch.trainer}</Col></Row>
							<Row><Col sm={3}>Location</Col><Col>{batch.location}</Col></Row>
						</Col>
					</Row>
					<hr/>
				</>)
			})
		)
	}

	//sorts batchDisplayData using the given object property. batch['id']
	//order is ascending
	sortBatches=(propertyAsKey:any)=>
	{
		prnt(doPrnt,`ViewAtAGlance sortBatches() has been reached`)

		if(this.state.sortAscend)
		{
			this.state.batchDisplayData.sort((a:any,b:any)=>
			{
				//compares numbers and strings. does not do date objects
				if(a[propertyAsKey]<b[propertyAsKey]){return -1}
				return 1
			})
		}
		else
		{
			this.state.batchDisplayData.sort((a:any,b:any)=>
			{
				if(a[propertyAsKey]<b[propertyAsKey]){return 1}
				return -1
			})
		}

		//prnt(doPrnt,`this.state.batchDisplayData=`,this.state.batchDisplayData)

		this.setState({//cause re-render as well
			sortAscend:!this.state.sortAscend
		})
	}

	//returns an array of batches that haven been transformed for easy display
	convertServerDataToDisplayData=(batchesFromServer:Batch[])=>
	{
		return batchesFromServer.map((batch:any)=>
		{
			let dateStart=new Date(batch.startDate)//convert strings to Date objects
			let dateEnd=new Date(batch.endDate)

			let weekC=dateDifferenceWeeks(dateStart,new Date(Date.now()))	//calc current week we are on
			let weekR=dateDifferenceWeeks(new Date(Date.now()),	dateEnd)	//calc weeks remaining

			let jsxWeekC=(<>{weekC}</>) //we want to know how to display the weeks
			let jsxWeekR=(<>{weekR}</>) //when now() is outside the week range, we want some nice display text

			if(Date.now()<dateStart.getTime())	//if the batch hasn't started yet
			{
				jsxWeekC=(<>Happening soon</>)
			}

			if(Date.now()>dateEnd.getTime())	//if the batch is overwith
			{
				jsxWeekR=(<>Already happened</>)
			}

			//transform and copy the server batch object to display batch format
			return{
				id:					batch.batchId,
				batchFromServer:	batch,			//this display batch will know the batch from the server
				name:				"No name on backend",//batch.name,
				dateStart:			dateStart,
				dateEnd:			dateEnd,

				dateStartText:		dateStart.toDateString(),//used to display the date
				dateEndText:		dateEnd.toDateString(),

				dateSortStart:		dateStart.getTime(),//used to sort the dates
				dateSortEnd:		dateEnd.getTime(),

				weekSortCurrent:	weekC,//the weeks as a number so they can be sorted
				weekSortRemaining:	weekR,

				jsxWeekCurrent:		jsxWeekC,//the weeks as jsx for display
				jsxWeekRemaining:	jsxWeekR,

				skillset:			batch.curriculum.curriculumSkillset.skillSetName,
				associatesActive:	associatesGetActiveTotal(batch.associates,true),
				associatesInactive:	associatesGetActiveTotal(batch.associates,false),
				trainers:			batch.trainers,
				location:			locationGetName(batch.location),
			}
		})
	}

	fetchTheBatchData=async()=>
	{
		// this.setState({
		// 	batchDisplayData:this.convertServerDataToDisplayData(pseudoDataResponse.data)
		// })

		// prnt(doPrnt,`fetchTheBatchData() has been reached`)

		// try
		// {
		// 	let response=await axiosClient.get('/batches')

		// 	prnt(doPrnt,`response=`,response)

		// 	if(response.status!==200)
		// 	{
		// 		this.setState({error:response})
		// 	}
		// 	else
		// 	{
		// 		this.setState({
		// 			batchDisplayData:this.convertServerDataToDisplayData(response.data),
		// 		})
		// 	}
		// }
		// catch(e)
		// {
		// 	this.setState({error:e})
		// }
		try {
			let batchData = await getAllBatches();
			let programtype=batchData.map((batch:Batch)=>{
				return batch.programType;
			
			});
			
			this.setState({
				batches: batchData,
				filteredBatches: batchData,
				batchDisplayData: this.convertServerDataToDisplayData(batchData),
				programTypesArray:programtype
			});





		} catch(e) {
			this.setState({error:e});
		}
	}

	setProgramType=(value:string)=>    //filter
	{	
		console.log(`Setting program type: ${value}`);
		this.setState({programType: value});
	}

	
	setClient=(value:string)=> {
		this.setState({client: value})
	}

	setCurriculum=(value:string)=> {   //filter
		this.setState({curriculum: value});
	}

	setViewType=(value:string)=>
	{
		this.setState({viewType:value})
	}

	filterBatchesByClient=(batchesToFilter: Batch[]) => {		// finds clients in batches, based on client demands regarding curricula
		if(this.state.client !== '(none)') {
			let client = this.state.client;
			let filteredBatches = batchesToFilter.filter( (b: Batch) => {
				let clientDemands = b.curriculum.curriculumSkillset.clientDemands;
				for(let cd of clientDemands) {
					if(cd.client.name === client) {
						return true;
					}
				}
				return false;
			} );
			// this.setState({
			// 	filteredBatches: filteredBatches,
			// 	batchDisplayData: this.convertServerDataToDisplayData(filteredBatches),
			// })
			return filteredBatches;
		} else {
			// let batches = this.state.batches;
			// this.setState({
			// 	filteredBatches: this.state.batches,
			// 	batchDisplayData: this.convertServerDataToDisplayData(batches),
			// })
			return batchesToFilter;
		}
	}

	filterBatchesByCurriculum = (batchesToFilter: Batch[]) => {
		if(this.state.curriculum !== '(none)') {
			let filtercurr=batchesToFilter;
			console.log(filtercurr)
			let filtered=filtercurr.filter((batch:Batch)=>{
				return batch.curriculum.name==this.state.curriculum;
			})
			console.log(filtered);

			// this.setState({filteredBatches:filtered,
			// 	batchDisplayData: this.convertServerDataToDisplayData(filtered)})
			return filtered;
		} else {
			return batchesToFilter;
		}
	}

	filterBatchesByProgramType = (batchesToFilter: Batch[]) => {
		if(this.state.programType !== '(none)') {
			if(this.state.programTypesArray.indexOf(this.state.programType)>-1){
				let filtercurr=batchesToFilter;
				let filtered=filtercurr.filter((batch:Batch)=>{
					return batch.programType===this.state.programType;
							  })
				console.log(filtered);
	
				// this.setState({filteredBatches:filtered,
				// 	batchDisplayData: this.convertServerDataToDisplayData(filtered)})
				return filtered;

			
			}	
		 else {
			return batchesToFilter;
		}
	} else {
		return batchesToFilter;
	}
}

	applyFilters = () => {
		let batches = this.state.batches;
		console.log(`Batches: ${batches}`);
		console.log(batches);
		let filteredBatches = this.filterBatchesByProgramType(batches);
		filteredBatches = this.filterBatchesByCurriculum(filteredBatches);
		filteredBatches = this.filterBatchesByClient(filteredBatches);
		this.setState({
			filteredBatches: filteredBatches,
			batchDisplayData: this.convertServerDataToDisplayData(filteredBatches)
		});
	}

	componentDidMount()
	{
		this.fetchTheBatchData()
	}
}

//Create a redux version of InProgress
export const ReduxInProgress = connect(allTheMapStateToProps, allTheActionMappers)(InProgress);