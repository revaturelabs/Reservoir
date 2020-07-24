import {CreateDropDown} from "./Components/CreateDropDown";
import { PageTitleBar } from "../Common/PageTitleBar";
import React, { useState, useEffect } from "react";
import axiosWrapper from "./functions/axiosWrapper";





export function GenerateNewBatch(props: any)
{
  //Data pulled from database
  const [locations, setLocations] = useState([]);
  const [skillSet, setSkillSet] = useState([]);

  //For storing currentState as well as currentSkillSet and start date
  const [loc,setLoc]=useState("");
  const [skill,setSkill]=useState("");
  const [startDate,setStartDate]= useState("")
  const [ammountOfWeeks,setAmmountOfWeeks]:any= useState(0)
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
        <input type="number" name="date" min="1" onChange={weekHandler}  placeholder="#Weeks Duration Ints" step="1"/>

        <br/>
        
      </div>
      <input type="submit" onClick={buttonHandler} disabled={testReturn()}/>
    </div>
  )

  function testReturn()
    {
      if (loc&&skill&&startDate&&ammountOfWeeks &&parseInt(ammountOfWeeks) && parseFloat(ammountOfWeeks)%1===0)
      {
        return false;
      }
      return true;
    }
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
  function weekHandler(e:any)
  {
    setAmmountOfWeeks(e.target.value);

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
    let b:any=[...a];
    b[2]=parseInt(b[2])+7*ammountOfWeeks;

    if(b[2]<10)
    {
      b[2]="0"+b[2]
    }
    let endDate=(b[0]+"-"+b[1]+"-"+b[2]);
    console.log(b)
    //Create our batch object
    let saveObject:any=
      {
        "batchId": 0,
        "startDate": dataBaseDate,
        "endDate": endDate,
        "state": 3,
        "interviewScoreLower": null,
        "programType": null,
        "locationId": loc,
        "curiculum_id": skill
    };

    //save our batch/
   
    axiosWrapper("/batchDAO","POST",saveObject).then((data)=>{
      props.setView(1);
    })
  }
}

