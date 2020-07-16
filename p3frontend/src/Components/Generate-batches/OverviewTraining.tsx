
import { Button } from "reactstrap";
import { Batch } from "../../models/Batch";
import { updateBatch } from "../Common/API/batch";
import { allTheMapStateToProps } from "../../redux/reducers";
import { batchUpdateActionMapper } from "../../redux/action-mapper";
import { connect } from "react-redux";
import { Interface } from "readline";
////////////////////////////////NEW LIST OF IMPORTS
import {CreateDropDown} from "./CreateDropDown";
import { PageTitleBar } from "../Common/PageTitleBar";
import React, { useState, useEffect } from "react";
import axiosWrapper from "./functions/axiosWrapper";
////////////////////////////////////







export function OverviewTraining()
{
  //Data pulled from database
  const [locations, setLocations] = useState([]);
  const [skillSet, setSkillSet] = useState({});

  //For storing currentState as well as currentSkillSet and start date
  const [loc,setLoc]=useState("");
  const [skill,setSkill]=useState("");
  const [startDate,setStartDate]= useState("")

  useEffect(()=>
  {
      //Load in data Locations and skillSet
      axiosWrapper("/location","GET").then((data)=>{
        setLocations(data)
      })

      /* CORS ISSUE
      axiosWrapper("/skillsets","GET").then((data)=>{
        setSkillSet(data)
      })
      */
  },[])
  
  console.log(loc);




  return(
    
    <div>
      <PageTitleBar pageTitle={"Generate New Batchs"}/>
      
      {/* Create the drop down menus as well as date input */}
      <div>
        <CreateDropDown records={locations} handler={locEventListener} keyValue={["locationId","locationName"]} defaultMessage="Select Location"/>
      </div>
    
    </div>
  )

  //event listeners to change state
  function locEventListener(e:any)
  {
    setLoc(e.target.value)
  }

}

