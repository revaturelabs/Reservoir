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
  const [trainerList, setTrainerList]=useState("")
  
  const [startDate,setStartDate]= useState("")
  const [ammountOfWeeks,setAmmountOfWeeks]:any= useState(0)
  const [reqScore,setReqScore]:any=useState(80)
  const [capacity,setCapacity]:any=useState(20)



  
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
        <label>Location</label>
        <CreateDropDown records={locations} handler={locHandler} keyValue={["locationId","locationName"]} defaultMessage="Select Location"/>

        <label>Skill</label>
        <CreateDropDown records={skillSet} handler={skillHandler} keyValue={["skillSetId","name"]} defaultMessage="Select Skill"/>
        
        <label>Start Date</label>
        <input type="date" name="date" min={formatedDate} max="2050-04-30" defaultValue={formatedDate} onChange={dateHandler}/>
        
        <label>Duration</label>
        <input type="number" name="date" min="1" onChange={weekHandler}  placeholder="#Weeks" step="1"/>

        <label>Batch Capacity</label>
        <input type="number" name="score" min={0} max="100" defaultValue={capacity} onChange={capacityHandler}/>

        <label>Required Score</label>
        <input type="number" name="score" min={0} max="100" defaultValue={reqScore} onChange={reqScoreHandler}/>

        <br/>
        <label>---Optional---</label>
        <br/>
        
        <input>Trainers</input>


      </div>
      <input type="submit" onClick={buttonHandler} disabled={testReturn()}/>
    </div>
  )

  function testReturn()
    {
      if (loc&&skill&&startDate&&ammountOfWeeks &&parseInt(ammountOfWeeks) && parseFloat(ammountOfWeeks)%1===0 && parseInt(reqScore)>=0 && parseInt(capacity)>=1)
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
    axiosWrapper("trainer/curriculum/"+e.target.value,"GET").then((data)=>{
      setTrainerList(data);
    })
  }
  
  function dateHandler(e:any)
  {
    setStartDate(e.target.value);

  }
  function weekHandler(e:any)
  {
    setAmmountOfWeeks(e.target.value);

  }
  function reqScoreHandler(e:any)
  {
    setReqScore(e.target.value);

  }
  function capacityHandler(e:any)
  {
    setCapacity(e.target.value);

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
      "batch_id": 0,
      "curriculum_id": parseInt(skill),
      "location_id": parseInt(loc),
      "start_date": dataBaseDate,
      "end_date": endDate,
      "batch_duration": parseInt(ammountOfWeeks),
      "batch_capacity": capacity,
      "required_score": reqScore,
      "associate_ids": [],
      "trainer_ids": []
  };

  
  console.log(saveObject)

    //save our batch/
   
    axiosWrapper("batches/","POST",saveObject).then((data)=>{
      props.setView(1);
    })
  }
}

