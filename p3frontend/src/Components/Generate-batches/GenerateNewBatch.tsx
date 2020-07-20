import {CreateDropDown} from "./Components/CreateDropDown";
import { PageTitleBar } from "../Common/PageTitleBar";
import React, { useState, useEffect } from "react";
import axiosWrapper from "./functions/axiosWrapper";





export function GenerateNewBatch()
{
  //Data pulled from database
  const [locations, setLocations] = useState([]);
  const [skillSet, setSkillSet] = useState([]);

  //For storing currentState as well as currentSkillSet and start date
  const [loc,setLoc]=useState("");
  const [skill,setSkill]=useState("");
  const [startDate,setStartDate]= useState("")

  //Get todays date in html formated way
  let today = new Date();
  //THe backend requires us to add 1 to the day
  let formatedDate= today.getFullYear()+"-"+String(today.getMonth() + 1).padStart(2, '0')+"-"+String(today.getDate()).padStart(2, '0');
  useEffect(()=>
  {
      //Load in data Locations and skillSet
      axiosWrapper("/location","GET").then((data)=>{
        setLocations(data)
      })

      axiosWrapper("/skillsets","GET").then((data)=>{
        setSkillSet(data)
      })

      setStartDate(formatedDate);
      
  },[])
  
  return(
    
    <div>
      
      {/* Create the drop down menus as well as date input */}
      <div>
        <CreateDropDown records={locations} handler={locHandler} keyValue={["locationId","locationName"]} defaultMessage="Select Location"/>
        <CreateDropDown records={skillSet} handler={skillHandler} keyValue={["skillSetId","skillSetName"]} defaultMessage="Select Skill"/>
        <input type="date" name="date" min={formatedDate} max="2050-04-30" defaultValue={formatedDate} onChange={dateHandler}/>
        <br/>
        
      </div>
      <input type="submit" onClick={buttonHandler}/>
    </div>
  )

  //event listeners to change state
  function locHandler(e:any)
  {
    setLoc(e.target.value);
  }

  function skillHandler(e:any)
  {
    setSkill(e.target.value);
  }
  
  function dateHandler(e:any)
  {
    setStartDate(e.target.value);

  }

  function buttonHandler(e:any)
  {
    e.preventDefault();
    //Add 1 to the day value of date
    let a:any=startDate.split("-");
    a[2]=parseInt(a[2])+1;
    
    //make sure its in proper format
    if(a[2]<10)
    {
      a[2]="0"+a[2]
    }
    let dataBaseDate=(a[0]+"-"+a[1]+"-"+a[2]);
    

    //Create our batch object
    let saveObject:any=
      {
        "batchId": 0,
        "startDate": dataBaseDate,
        "endDate": null,
        "state": 3,
        "interviewScoreLower": null,
        "programType": null,
        "locationId": loc,
        "curiculum_id": skill
    };

    //save our batch/
    axiosWrapper("/batchDAO","POST",saveObject).then((data)=>{
      
    })
  }
}

