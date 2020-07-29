import { CreateDropDown } from "../Components/CreateDropDown";
import { PageTitleBar } from "../../Common/PageTitleBar";
import React, { useState, useEffect } from "react";
import axiosWrapper from "../functions/axiosWrapper";
import { GenerateNewBatch } from "../GenerateNewBatch";
import { isCompositeComponent } from "react-dom/test-utils";
import { faTruckMonster } from "@fortawesome/free-solid-svg-icons";

//This is for displaying our current selected batch to modify
export function FinalizeSpecificBatch(props: any) {

  //Data pulled from database
  const [locations, setLocations] = useState([]);
  const [skillSet, setSkillSet] = useState([]);
  const [modifiedBatch, setModifiedBatch]: any = useState({});

  const [staticTrainers, setStaticTrainers] = useState([]);
  const [currentTrainerList, setCurrentTrainerList]: any = useState([]);
  const [selectedTrainer, setSelectedTrainer]: any = useState();

  //For getting and displaying trainerNames
  const [associateNames, setAssociateNames]: any = useState([])
  //For tracking a useEffect
  const [increment, setIncrement]: any = useState(0);
  let today = new Date();
  //THe backend requires us to add 1 to the day before we submit it
  let formatedDate = today.getFullYear() + "-" + String(today.getMonth() + 1).padStart(2, '0') + "-" + String(today.getDate()).padStart(2, '0');

  useEffect(() => {

    axiosWrapper("/batches/" + props.batchId, "GET").then((data) => {
      let trainerIds: any = [];
      for (let i = 0; i < data.trainers.length; i++) {
        trainerIds.push(data.trainers[i].trainerId)
      }

      let assosiateIds = [];
      for (let i = 0; i < data.associates.length; i++) {
        assosiateIds.push(data.associates[i].associateId);
      }

      let associateId: any = [];
      let associateInfo: any = [];

      data.associates.forEach((ele: any) => {
        associateId.push(ele.associateId)
        associateInfo.push(
          {
            "associateId": ele.associateId,
            "name": ele.firstName + " " + ele.lastName
          }
        )
      })




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
          "associate_ids": associateId,
          "trainer_ids": trainerIds
        });
      setAssociateNames(associateInfo)
      //Load other data in second to setup default values
      axiosWrapper("/location", "GET").then((data) => {
        setLocations(data)
      })
      axiosWrapper("/curricula", "GET").then((data) => {
        setSkillSet(data)
      })

      axiosWrapper("trainer/curriculum/" + data.curriculum.curriculumId, "GET").then((data: any) => {
        setStaticTrainers(data);

        //setup current trainer list

        let a = data.filter((element: any) => {
          for (let i = 0; i < trainerIds.length; i++) {
            if (trainerIds[i] == element.trainer_id) {
              return false;
            }
          }
          return true;
        })
        let initialDropDown: any = [];
        for (let i = 0; i < a.length; i++) {
          initialDropDown.push(
            {
              "trainer_id": a[i].trainer_id,
              "name": a[i].firstName + " " + a[i].lastName
            }
          )
        }
        if(initialDropDown.length==0)
        {
          setCurrentTrainerList(["empty"])
        }
        else{
          setCurrentTrainerList(initialDropDown)
        }
        
      })
    })
  }, [])

  //change the id associated with main array
  useEffect(() => {
    const ids: any = [];
    associateNames.forEach((ele: any) => {
      ids.push(ele.associateId)
    })
    setModifiedBatch({ ...modifiedBatch, "associate_ids": ids })
  }, [associateNames])

  //Track the increment changes
  useEffect(() => {
    if (currentTrainerList == ["empty"]) {
      let element: any = document.getElementById("addTrainerUpdateBatch")
      element.value = "none"
    }
  }, [increment])

  return (
    <div className="container-fluid">
      <div className="card generate-batch-container">

        <div className="row">
          <div className="col">
            <label className="d-block generate-new-batch-label">Curriculum</label>
            <CreateDropDown myId="update-batch-dropdown-curriculum" className="d-block col generate-new-batch-input" records={skillSet} handler={skillHandler} keyValue={["curriculumId", "name"]} defaultMessage="Select Skill" defaultVal={modifiedBatch.curriculum_id} />
          </div>

          <div className="col">
            <label className="d-block generate-new-batch-label">Location</label>
            <CreateDropDown myId="update-batch-dropdown-location" className="d-block col generate-new-batch-input" records={locations} handler={locHandler} keyValue={["locationId", "locationName"]} defaultMessage="Select Location" defaultVal={modifiedBatch.location_id} />
          </div>
        </div>

        <div className="row">
          <div className="col">
            <label className="d-block generate-new-batch-label">Start Date:</label>
            <input className="d-block col generate-new-batch-input" type="date" name="date" min={formatedDate} max="2050-04-30" defaultValue={modifiedBatch.start_date} onChange={startDateHandler} />
          </div>

          <div className="col">
            <label className="d-block generate-new-batch-label">End Date:</label>
            <input className="d-block col generate-new-batch-input" type="date" name="date" min={formatedDate} max="2050-04-30" defaultValue={modifiedBatch.end_date ? modifiedBatch.end_date : modifiedBatch.start_date} onChange={endDateHandler} />
          </div>
        </div>

        <div className="row">
          <div className="col">
            <label className="d-block generate-new-batch-label">Batch Capacity</label>
            <input className="d-block col generate-new-batch-input" type="number" name="capacity" min={0} max="100" defaultValue={modifiedBatch.batch_capacity} onChange={capacityHandler} />
          </div>

          <div className="col">
            <label className="d-block generate-new-batch-label">Required Interview Score:</label>
            <input className="d-block col generate-new-batch-input" type="number" name="score" min={0} max="100" defaultValue={modifiedBatch.required_score} onChange={interviewScoreHandler} />
          </div>
        </div>

        <div className="generate-new-batch-optional-container">

          <div className="row">
            <div className="col">

              <label className="d-block generate-new-batch-label text-center">Associates</label>
              <div className="row justify-content-center">
                <input className="btn-primary btn-generate-associates" type="submit" onClick={associateHandler} value="Generate Associates" />
              </div>

              <div className="added-associates-box">
                {
                  (() => {
                    if (associateNames.length) {
                      let sortedList: any = [];
                      associateNames.forEach((ele: any) => {
                        sortedList.push(ele.name)
                      }
                      )
                      sortedList.sort();
                      return (
                        <div>
                          {
                            sortedList.map((ele: any, index: any) => {
                              return (<p key={index}>{ele}</p>)
                            })
                          }
                        </div>
                      )
                    }
                  })()
                }
              </div>


            </div>
            <div className="col">

              {/* <label>{currentTrainerList.length && modifiedBatch && modifiedBatch.trainer_ids && modifiedBatch.trainer_ids.length < 2 ? "Trainers" : (modifiedBatch && modifiedBatch.trainer_ids && modifiedBatch.trainer_ids.length < 2 ? "No Available Trainers" : "Trainer Limit Reached")}</label> */}
              <label className="d-block generate-new-batch-label text-center trainers-tabel">Trainers</label>
              <CreateDropDown className="select-trainer-dropdown" records={currentTrainerList} handler={selectedTrainerHandler} keyValue={["trainer_id", "name"]} defaultMessage="Select Trainer" myId="addTrainerUpdateBatch" />
              <input className="btn-primary btn-add-trainer" type="submit" onClick={addTrainerHandler} disabled={(selectedTrainer && modifiedBatch && modifiedBatch.trainer_ids && modifiedBatch.trainer_ids.length < 2) ? false : true} value="Add Trainer" />


              <div className="added-trainers-box">
                {/* <label hidden={modifiedBatch.trainer_ids && modifiedBatch.trainer_ids.length ? false : true}>Added Trainers</label> */}
                {(() => {
                  if (modifiedBatch.trainer_ids && staticTrainers.length) {

                    return (
                      modifiedBatch.trainer_ids.map((data: any, index: any) => {
                        let findName: any = staticTrainers.filter((ele: any) => ele.trainer_id == data);
                        findName = findName[0];
                        return (
                          <p key={index} onClick={(e: any) => { removeTrainerHandler(e, findName.trainer_id) }}>{`${findName.firstName} ${findName.lastName}`}</p>
                        )
                      })
                    )
                  }
                })()}
              </div>
            </div>
          </div>
        </div>

        <div className="row update-batch-buttons">
          <div className="col">
            <input className="btn btn-secondary update-batch-button-cancel" type="submit" onClick={viewChanger} value="Cancel" />
          </div>
          <div className="col">
            <input className="btn btn-success update-batch-button-save" type="submit" onClick={buttonHandler} value="Save" disabled={toggleSave()}/>
          </div>
        </div>

      </div>

    </div>
  )

  function toggleSave() 
  {
    if(modifiedBatch.start_date && parseInt(modifiedBatch.required_score)>=1 && modifiedBatch.required_score<=100 && modifiedBatch.batch_capacity>=1 && modifiedBatch.batch_capacity<=50)
    {
      return false;
    }
    return true;
  }
  function associateHandler() {
    axiosWrapper(`/associates/${modifiedBatch.required_score}/score/${modifiedBatch.batch_capacity}/capacity`, "GET").then((data) => {
      const associateInfo: any = [];
      data.forEach((ele: any) => {
        associateInfo.push(
          {
            "associateId": ele.associateId,
            "name": ele.firstName + " " + ele.lastName
          }
        )
      })
      setAssociateNames(associateInfo)
    })
  }

  function removeTrainerHandler(e: any, trainer_id: any): any {
    let trainerIds = [...modifiedBatch.trainer_ids];
    trainerIds = trainerIds.filter((ele) => ele != trainer_id);
    setModifiedBatch({ ...modifiedBatch, "trainer_ids": trainerIds });

    //Add it back to the dop down list now that is has been removed from the object
    let a: any = staticTrainers.filter((element: any) => {
      for (let i = 0; i < trainerIds.length; i++) {
        if (trainerIds[i] == element.trainer_id) {
          return false;
        }
      }
      return true;
    })
    let initialDropDown: any = [];
    for (let i = 0; i < a.length; i++) {
      initialDropDown.push(
        {
          "trainer_id": a[i].trainer_id,
          "name": a[i].firstName + " " + a[i].lastName
        }
      )
    }
    setCurrentTrainerList(initialDropDown)

    //Reset default values
    if (currentTrainerList.length) {
      let element: any = document.getElementById("addTrainerUpdateBatch")

      if (element) {
        element.value = "none"
      }
    }
    setSelectedTrainer();
  }


  function addTrainerHandler() {
    setModifiedBatch({ ...modifiedBatch, "trainer_ids": [...modifiedBatch.trainer_ids, parseInt(selectedTrainer)] });

    let trainerIds = [...modifiedBatch.trainer_ids, parseInt(selectedTrainer)];
    let removedIndex;
    let a: any = staticTrainers.filter((element: any, index: number) => {
      for (let i = 0; i < trainerIds.length; i++) {
        if (trainerIds[i] == element.trainer_id) {
          removedIndex = index;
          return false;
        }
      }
      return true;
    })


    let initialDropDown: any = [];

    for (let i = 0; i < a.length; i++) {
      initialDropDown.push(
        {
          "trainer_id": a[i].trainer_id,
          "name": a[i].firstName + " " + a[i].lastName
        }
      )
    }

    setSelectedTrainer();
    if(initialDropDown.length==0)
    {
      setCurrentTrainerList(["empty"])
    }
    else{
      setCurrentTrainerList(initialDropDown)
    }

   
    let element: any = document.getElementById("addTrainerUpdateBatch")
    if (element) {
      element.value = "none"
    }
  
  
  }


  //Event handlers
  function locHandler(e: any) {
    setModifiedBatch({ ...modifiedBatch, "location_id": e.target.value })

  }
  function skillHandler(e: any) {

    setModifiedBatch({ ...modifiedBatch, "curriculum_id": e.target.value, "trainer_ids": [] })
    axiosWrapper("trainer/curriculum/" + e.target.value, "GET").then((data: any) => {
      setStaticTrainers(data)
      let displayedList: any = [];
      if (data) {
        data.forEach((e: any, i: any) => {
          displayedList.push
            ({
              "trainer_id": data[i].trainer_id,
              "name": data[i].firstName + " " + data[i].lastName
            })
        })
      }
      if (!displayedList.length) {
        setCurrentTrainerList(["empty"]);
        let a = JSON.parse(JSON.stringify(increment))
        setIncrement(a + 1);
      }
      else {
        setCurrentTrainerList(displayedList)
      }

    })



  }

  function startDateHandler(e: any) {
    setModifiedBatch({ ...modifiedBatch, "start_date": e.target.value })
  }

  function endDateHandler(e: any) {
    setModifiedBatch({ ...modifiedBatch, "end_date": e.target.value })
  }

  function interviewScoreHandler(e: any) {
    setModifiedBatch({ ...modifiedBatch, "required_score": e.target.value })
    setAssociateNames([])
  }

  function capacityHandler(e: any) {
    setModifiedBatch({ ...modifiedBatch, "batch_capacity": e.target.value })
    setAssociateNames([])
  }

  function buttonHandler(e: any) {
    e.preventDefault();
    //add 1 to both start and end date because back end subtracts one
    let saveObject = { ...modifiedBatch, start_date: modifyDay(modifiedBatch.start_date), end_date: modifyDay(modifiedBatch.end_date) }
    //save our data
    axiosWrapper("/batches", "POST", saveObject).then((data) => {
      //Redirect to batchs

      props.setView(0);
    })

  }

  function viewChanger() {
    props.setView(0);
  }

  function selectedTrainerHandler(e: any) {
    setSelectedTrainer(e.target.value)
  }

  //ment to alter our date to add 1 to it in order to store to database
  //no longer adding 1 to the day
  function modifyDay(date: any) {
    //comes in form Year/Month/Day
    if (date !== null) {
      let a = date.split("-");
      a[2] = parseInt(a[2]);
      if (a[2] < 10) {
        a[2] = "0" + a[2];
      }
      return (a[0] + "-" + a[1] + "-" + a[2]);
    }

    return null;

  }

}