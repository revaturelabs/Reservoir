import {CreateDropDown} from "../Components/CreateDropDown";
import React, { useState, useEffect } from "react";
import axiosWrapper from "../functions/axiosWrapper";
////////////////////////////////////






//This is for displaying our current selected batch to modify
export function FinalizeSpecificBatch(props:any)
{
 
  //Data pulled from database
  const [locations, setLocations] = useState([]);
  const [skillSet, setSkillSet] = useState([]);
  const [modifiedBatch, setModifiedBatch]:any=useState({});

  const [staticTrainers, setStaticTrainers]=useState([]);
  const [currentTrainerList,setCurrentTrainerList]:any=useState([]);
  const [selectedTrainer, setSelectedTrainer]:any=useState();

  //For tracking a useEffect
  const [increment,setIncrement]:any=useState(0);
  let today = new Date();
  //THe backend requires us to add 1 to the day before we submit it
  let formatedDate= today.getFullYear()+"-"+String(today.getMonth() + 1).padStart(2, '0')+"-"+String(today.getDate()).padStart(2, '0');
  
  useEffect(()=>{
    
    axiosWrapper("/batches/"+props.batchId,"GET").then((data)=>
    {
      let trainerIds:any=[];
      for(let i=0;i<data.trainers.length;i++)
      {
        trainerIds.push(data.trainers[i].trainerId)
      }

      let assosiateIds=[];
      for(let i=0;i<data.associates.length;i++)
      {
        assosiateIds.push(data.associates[i].associateId);
      }

      setModifiedBatch(
        {
          "batch_id": data.batchId,
          "curriculum_id": data.curriculum.curriculumId,
          "location_id": data.location.locationId,
          "start_date": data.startDate,
          "end_date": data.endDate,
          "batch_duration": 1,
          "batch_capacity": data.batchCapacity,
          "required_score": data.interviewScoreLower,
          "associate_ids": assosiateIds,
          "trainer_ids": trainerIds
      });

        //Load other data in second to setup default values
        axiosWrapper("/location","GET").then((data)=>{
          setLocations(data)
        })
        axiosWrapper("/curricula","GET").then((data)=>{
          setSkillSet(data)
        })

        axiosWrapper("trainer/curriculum/"+data.curriculum.curriculumId,"GET").then((data:any)=>{
          setStaticTrainers(data);

           //setup current trainer list
    
           let a=data.filter((element:any)=>
           {
             for (let i=0;i<trainerIds.length;i++)
             {
               if (trainerIds[i]==element.trainer_id)
                {
                  return false;
                }
             }
             return true; 
           })
           let initialDropDown:any=[];
           for(let i=0;i<a.length;i++)
           {
             initialDropDown.push(
               {
                 "trainer_id":a[i].trainer_id,
                 "name":a[i].firstName+" "+a[i].lastName
               }
             )
           }
           setCurrentTrainerList(initialDropDown)
        })
    })
  },[])

  useEffect(()=>{
    if(currentTrainerList==["empty"])
    {
      let element:any=document.getElementById("changeValues1")
      element.value="none"
    }
  },[increment])
  
  return(
    <div>
          <label>Location</label>
          <CreateDropDown records={locations} handler={locHandler} keyValue={["locationId","locationName"]} defaultMessage="Select Location" defaultVal={modifiedBatch.location_id}/>

          <label>Curriculum</label>
          <CreateDropDown records={skillSet} handler={skillHandler} keyValue={["curriculumId","name"]} defaultMessage="Select Skill" defaultVal={modifiedBatch.curriculum_id}/>

          <label>Start Date:</label>
          <input type="date" name="date" min={formatedDate} max="2050-04-30" defaultValue={modifiedBatch.start_date} onChange={startDateHandler}/>

          <label>End Date:</label>
          <input type="date" name="date" min={formatedDate} max="2050-04-30" defaultValue={modifiedBatch.end_date?modifiedBatch.end_date:modifiedBatch.start_date} onChange={endDateHandler}/>

          <label>Batch Capacity</label>
          <input type="number" name="capacity" min={0} max="100" defaultValue={modifiedBatch.batch_capacity} onChange={capacityHandler}/>
          
          <label>Required Interview Score:</label>
          <input type="number" name="score" min={0} max="100" defaultValue={modifiedBatch.required_score} onChange={interviewScoreHandler}/>

          <label>{ currentTrainerList.length && modifiedBatch && modifiedBatch.trainer_ids && modifiedBatch.trainer_ids.length<2?"Trainers": (modifiedBatch && modifiedBatch.trainer_ids && modifiedBatch.trainer_ids.length<2?"No Available Trainers":"Trainer Limit Reached")}</label>
          <CreateDropDown records={currentTrainerList} handler={selectedTrainerHandler} keyValue={["trainer_id","name"]} defaultMessage="Select Trainer" myId="changeValues1"/>
          <input type="submit" onClick={addTrainerHandler} disabled={(selectedTrainer &&  modifiedBatch && modifiedBatch.trainer_ids && modifiedBatch.trainer_ids.length<2)?false:true} value="Add Trainer"/>


          <label hidden={modifiedBatch.trainer_ids && modifiedBatch.trainer_ids.length?false:true}>Added Trainers</label>
          {(()=>{
            if(modifiedBatch.trainer_ids && staticTrainers.length)
            {
            
              return(
              modifiedBatch.trainer_ids.map((data:any,index:any)=>
              {
                let findName:any=staticTrainers.filter((ele:any)=>ele.trainer_id==data);
                findName=findName[0];
                return(
                  <p key={index} onClick={(e:any) => {removeTrainerHandler(e, findName.trainer_id)}}>{"Trainer "+(parseInt(index)+1)+":"+findName.firstName+" "+findName.lastName}</p>
                )
              })
              )
            }
            })()}

          <input type="submit" onClick={buttonHandler} value="Save"/> 
          <input type="submit" onClick={viewChanger} value="Back"/> 

    </div>
  )
  function toggleSave()
  {
    ///make sure batch has load
    if(Object.keys(modifiedBatch).length)
    {
      //if(modifiedBatch.required_score>=0 $$ modifiedBatch)
    }
  }

  function removeTrainerHandler(e:any,trainer_id:any):any
  {
    let trainerIds=[...modifiedBatch.trainer_ids];
    trainerIds=trainerIds.filter((ele)=>ele!=trainer_id);
    setModifiedBatch({...modifiedBatch,"trainer_ids":trainerIds});

    //Add it back to the dop down list now that is has been removed from the object
    let a:any=staticTrainers.filter((element:any)=>
    {
      for (let i=0;i<trainerIds.length;i++)
      {
        if (trainerIds[i]==element.trainer_id)
         {
           return false;
         }
      }
      return true; 
    })
    let initialDropDown:any=[];
    for(let i=0;i<a.length;i++)
    {
      initialDropDown.push(
        {
          "trainer_id":a[i].trainer_id,
          "name":a[i].firstName+" "+a[i].lastName
        }
      )
    }
    setCurrentTrainerList(initialDropDown)

    //Reset default values
    if(currentTrainerList.length)
    {
      let element:any=document.getElementById("changeValues1")
      if(element)
      {
      element.value="none"
      }
    }
    setSelectedTrainer();
  }


  function addTrainerHandler()
  {
    setModifiedBatch({...modifiedBatch, "trainer_ids":[...modifiedBatch.trainer_ids,parseInt(selectedTrainer)]});
    
    let trainerIds=[...modifiedBatch.trainer_ids,parseInt(selectedTrainer)];
    let removedIndex;
    let a:any=staticTrainers.filter((element:any,index:number)=>
    {
      for (let i=0;i<trainerIds.length;i++)
      {
        if (trainerIds[i]==element.trainer_id)
        {
          removedIndex=index;
          return false;
        }
      }
      return true; 
    })

   
    let initialDropDown:any=[];

    for(let i=0;i<a.length;i++)
    {
      initialDropDown.push(
        {
          "trainer_id":a[i].trainer_id,
          "name":a[i].firstName+" "+a[i].lastName
        }
      )
    }
    if(initialDropDown.length)
    {
      let element:any=document.getElementById("changeValues1")
      if(element)
      {
      element.value="none"
      }
    }
    setSelectedTrainer();
    setCurrentTrainerList(initialDropDown)
  }


//Event handlers
  function locHandler(e:any)
  {
    setModifiedBatch({...modifiedBatch, "location_id":e.target.value})
  
  }
  function skillHandler(e:any)
  {

    setModifiedBatch({...modifiedBatch, "curriculum_id":e.target.value,"trainer_ids":[]})
    axiosWrapper("trainer/curriculum/"+e.target.value,"GET").then((data:any)=>{
      setStaticTrainers(data)
      let displayedList:any=[];
      if(data)
      {
        data.forEach((e:any,i:any)=>{
          displayedList.push
          ({
            "trainer_id":data[i].trainer_id,
            "name":data[i].firstName+" "+data[i].lastName
          })
        })
      }
      if (!displayedList.length)
      {
        setCurrentTrainerList(["empty"]);
        let a=JSON.parse(JSON.stringify(increment))
        setIncrement(a+1);
      }
      else
      {
        setCurrentTrainerList(displayedList)
      }
      
    })
    

    
  }

  function startDateHandler(e:any)
  {
    setModifiedBatch({...modifiedBatch, "start_date":e.target.value})
  }

  function endDateHandler(e:any)
  {
    setModifiedBatch({...modifiedBatch, "end_date":e.target.value})
  }

  function interviewScoreHandler(e:any)
  {
    setModifiedBatch({...modifiedBatch, "required_score":e.target.value})
  }

  function capacityHandler(e:any)
  {
    setModifiedBatch({...modifiedBatch, "batch_capacity":e.target.value})
  }

  function buttonHandler(e:any)
  {
    e.preventDefault();
    //add 1 to both start and end date because back end subtracts one
    let saveObject={...modifiedBatch, start_date:modifyDay(modifiedBatch.start_date) , end_date:modifyDay(modifiedBatch.end_date)}
    //save our data
    axiosWrapper("/batches","POST",saveObject).then((data)=>{
      //Redirect to batchs
  
      props.setView(0);
    })

  }

  function viewChanger()
  {
    props.setView(0);
  }

  function selectedTrainerHandler(e:any)
  {
    setSelectedTrainer(e.target.value)
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

