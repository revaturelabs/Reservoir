import {CreateDropDown} from "../Components/CreateDropDown";
import { PageTitleBar } from "../../Common/PageTitleBar";
import React, { useState, useEffect } from "react";
import axiosWrapper from "../functions/axiosWrapper";
import { GenerateNewBatch } from "../GenerateNewBatch";

////////////////////////////////////






//This is for displaying our current selected batch to modify
export function FinalizeSpecificBatch(props:any)
{
 
  //Data pulled from database
  const [locations, setLocations] = useState([]);
  const [skillSet, setSkillSet] = useState([]);
  const [modifiedBatch, setModifiedBatch]:any=useState({});


  let today = new Date();
  //THe backend requires us to add 1 to the day before we submit it
  let formatedDate= today.getFullYear()+"-"+String(today.getMonth() + 1).padStart(2, '0')+"-"+String(today.getDate()).padStart(2, '0');
  
  useEffect(()=>{
    
    axiosWrapper("/batches/"+props.batchId,"GET").then((data)=>{
      setModifiedBatch(
        {
          "batchId": data.batchId,
          "startDate": data.startDate,
          "endDate": data.endDate,
          "state": 3, //Dont modify this as 3 is unconfirmed
          "interviewScoreLower": data.interviewScoreLower,
          "programType": data.programType,
          "locationId": data.location.locationId,
          "curiculum_id": data.curriculum.curriculumId
        });
        


        //Load other data in second to setup default values
        axiosWrapper("/location","GET").then((data)=>{
          setLocations(data)
        })
        axiosWrapper("/skillsets","GET").then((data)=>{
          setSkillSet(data)
        })
    })



 

 
  },[])

  console.log(modifiedBatch)
  return(
    <div>
          <label>curriculum</label>
          <CreateDropDown records={skillSet} handler={skillHandler} keyValue={["skillSetId","skillSetName"]} defaultMessage="Select Skill" defaultVal={modifiedBatch.curiculum_id}/>

          <label>Start Date:</label>
          <input type="date" name="date" min={formatedDate} max="2050-04-30" defaultValue={modifiedBatch.startDate} onChange={startDateHandler}/>

          <label>End Date:</label>
          <input type="date" name="date" min={formatedDate} max="2050-04-30" defaultValue={modifiedBatch.endDate?modifiedBatch.endDate:modifiedBatch.startDate} onChange={endDateHandler}/>

          <label>Location</label>
          <CreateDropDown records={locations} handler={locHandler} keyValue={["locationId","locationName"]} defaultMessage="Select Location" defaultVal={modifiedBatch.locationId}/>

          <label>Required Interview Score:</label>
          <input type="number" name="score" min={0} max="100" defaultValue={modifiedBatch.interviewScoreLower} onChange={interviewScoreHandler}/>


          <input type="submit" onClick={buttonHandler}/>

    </div>
  )
    console.log(modifiedBatch.location);
    


//Event handlers
  function locHandler(e:any)
  {
    setModifiedBatch({...modifiedBatch, "locationId":e.target.value})
  }
  function skillHandler(e:any)
  {
    setModifiedBatch({...modifiedBatch, "curiculum_id":e.target.value})

  }

  function startDateHandler(e:any)
  {
    setModifiedBatch({...modifiedBatch, "startDate":e.target.value})
  }

  function endDateHandler(e:any)
  {
    setModifiedBatch({...modifiedBatch, "endDate":e.target.value})
  }

  function interviewScoreHandler(e:any)
  {
    setModifiedBatch({...modifiedBatch, "interviewScoreLower":e.target.value})
  }


  function buttonHandler(e:any)
  {
    e.preventDefault();
    //add 1 to both start and end date because back end subtracts one
    let saveObject={...modifiedBatch, startDate:modifyDay(modifiedBatch.startDate) , endDate:modifyDay(modifiedBatch.endDate)}
    //save our data
    axiosWrapper("/batchDAO","POST",saveObject).then((data)=>{
      //Redirect to batchs

      props.setView(0);
    })

  }

  //ment to alter our date to add 1 to it in order to store to database
  function modifyDay(date:any)
  {
      //comes in form Year/Month/Day
      if(date!==null)
      {
        let a=date.split("-");
        a[2]=parseInt(a[2])+1;
        if(a[2]<10)
        {
          a[2]="0"+a[2];
        }
        return (a[0]+"-"+a[1]+"-"+a[2]);
      }

      return null;

  }

}

