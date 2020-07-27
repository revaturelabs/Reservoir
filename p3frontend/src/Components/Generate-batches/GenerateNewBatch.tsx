import { CreateDropDown } from "./Components/CreateDropDown";
import { PageTitleBar } from "../Common/PageTitleBar";
import React, { useState, useEffect } from "react";
import axiosWrapper from "./functions/axiosWrapper";
import { Console } from "console";
import { connect } from "react-redux";





export function GenerateNewBatch(props: any) {
  //Data pulled from database
  const [locations, setLocations]: any = useState([]);
  const [skillSet, setSkillSet]: any = useState([]);
  const [trainerList, setTrainerList]: any = useState(["empty"]);
  const [staticTrainerList, setStaticTrainerList]: any = useState([])
  //For storing currentState as well as currentSkillSet and start date


  const [loc, setLoc] = useState("");
  const [skill, setSkill] = useState("");
  const [startDate, setStartDate] = useState("")
  const [ammountOfWeeks, setAmmountOfWeeks]: any = useState(0)
  const [reqScore, setReqScore]: any = useState(80)
  const [capacity, setCapacity]: any = useState(20)
  const [trainerArray, setTrainerArray]: any = useState([])
  //For storing selected trainers
  const [selectedTrainer, setSelectedTrainer]: any = useState();



  //Get todays date in html formated way
  let today = new Date();
  //get the date
  let formatedDate = today.getFullYear() + "-" + String(today.getMonth() + 1).padStart(2, '0') + "-" + String(today.getDate()).padStart(2, '0');
  useEffect(() => {
    //Load in data Locations and skillSet
    axiosWrapper("/location", "GET").then((data) => {
      setLocations(data)
    })

    // Tested with hard code
    // setLocations(["Reston", "UTA", "Tampa"])

    axiosWrapper("/skillsets", "GET").then((data) => {
      setSkillSet(data)
    })

    // Tested with hard code
    // setSkillSet(["Java-React", "Python", ".Net"])

    setStartDate(formatedDate);

  }, [])
  return (

    <div className="container-fluid">
      <div className="card generate-batch-container">
        {/* Create the drop down menus as well as date input */}
        <div>

          <div className="row">
            <div className="col">
              <label className="d-block generate-new-batch-label"> Skill </label>
              <CreateDropDown className="d-block col generate-new-batch-input" records={skillSet} handler={skillHandler} keyValue={["skillSetId", "name"]} defaultMessage="Select Skill" />
            </div>

            <div className="col">
              <label className="d-block generate-new-batch-label"> Location </label>
              <CreateDropDown className="d-block col generate-new-batch-input" records={locations} handler={locHandler} keyValue={["locationId", "locationName"]} defaultMessage="Select Location" />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <label className="d-block generate-new-batch-label"> Start Date </label>
              <input className="d-block col generate-new-batch-input" type="date" name="date" min={formatedDate} max="2050-04-30" defaultValue={formatedDate} onChange={dateHandler} />
            </div>

            <div className="col">
              <label className="d-block generate-new-batch-label" > Duration </label>
              <input className="d-block col generate-new-batch-input" type="number" name="date" min="1" onChange={weekHandler} placeholder="#Weeks" step="1" />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <label className="d-block generate-new-batch-label" > Batch Capacity </label>
              <input className="d-block col generate-new-batch-input" type="number" name="score" min={0} max="100" defaultValue={capacity} onChange={capacityHandler} />
            </div>

            <div className="col">
              <label className="d-block generate-new-batch-label" > Required Score </label>
              <input className="d-block col generate-new-batch-input" type="number" name="score" min={0} max="100" defaultValue={reqScore} onChange={reqScoreHandler} />
            </div>
          </div>

          <div className="generate-new-batch-optional-container">
            <label className="row justify-content-center optional-title"> Optional </label>

            <div className="row">
              <div className="col">

              </div>
              <div className="col">
                {/* <label className="d-block">{trainerList.length && trainerArray.length < 2 ? "Trainers" : (trainerArray.length < 2 ? "Please select a skillset" : "Trainer Limit Reached")}</label> */}
                <label className="d-block generate-new-batch-label text-center trainers-tabel">Trainers</label>
                <CreateDropDown className={"select-trainer-dropdown"} records={trainerList} handler={trainerListHandler} keyValue={["trainer_id", "name"]} defaultMessage="Select Trainer" />
                <input className="btn-primary btn-add-trainer" type="submit" onClick={addTrainerHandler} disabled={(trainerList.length && selectedTrainer && (trainerArray.length < 2)) ? false : true} value="Add Trainer" />

                <div className="added-trainers-box">
                  {/* <label hidden={trainerArray.length ? false : true}> Added Trainers </label> */}
                  {trainerArray.map((data: any, index: any) => {
                    let findName: any = staticTrainerList.filter((ele: any) => ele.trainer_id == data);
                    findName = findName[0];
                    return (
                      <p key={index}> {`${findName.firstName} ${findName.lastName}`}</p>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="row justify-content-center">
            <input type="submit" className="btn btn-success" onClick={buttonHandler} disabled={testReturn()} />
          </div>

        </div>
      </div>
    </div>
  )

  //Function to check if they have required information to submit
  function testReturn() {
    if (loc && skill && startDate && ammountOfWeeks && parseInt(ammountOfWeeks) && parseFloat(ammountOfWeeks) % 1 === 0 && parseInt(reqScore) >= 0 && parseInt(capacity) >= 1) {
      return false;
    }
    return true;
  }
  //event listeners to change state
  function locHandler(e: any) {
    setLoc(e.target.value);
  }

  function trainerListHandler(e: any) {
    setSelectedTrainer(e.target.value)
  }

  function skillHandler(e: any) {
    setSkill(e.target.value);
    setTrainerList([])

    //reset the selected trainers and populate the trainerDropdown array
    setSelectedTrainer();
    setTrainerArray([]);
    axiosWrapper("trainer/curriculum/" + e.target.value, "GET").then((data: any) => {
      setStaticTrainerList(data);
      let storedTrainers: any = [];
      for (let i = 0; i < data.length; i++) {
        storedTrainers.push({
          "trainer_id": data[i].trainer_id,
          "name": data[i].firstName + " " + data[i].lastName
        })
      }
      setTrainerList(storedTrainers);
    })

  }

  function dateHandler(e: any) {
    setStartDate(e.target.value);

  }
  function weekHandler(e: any) {
    setAmmountOfWeeks(e.target.value);

  }
  function reqScoreHandler(e: any) {
    setReqScore(e.target.value);

  }
  function capacityHandler(e: any) {
    setCapacity(e.target.value);

  }

  function addTrainerHandler(e: any) {
    let currentTrainer = [...trainerArray, parseInt(selectedTrainer)];
    //console.log(currentTrainer)
    setTrainerArray([...trainerArray, parseInt(selectedTrainer)])

    //Remove the trainer from the drop down list
    let tList = [...trainerList]
    const updatedTrainerList: any = [];
    let removedIndex: any;
    for (let i = 0; i < tList.length; i++) {
      let flag = true;

      for (let j = 0; j < currentTrainer.length; j++) {
        if (tList[i].trainer_id == currentTrainer[j]) {
          flag = false;
          removedIndex = i;
        }
      }
      if (flag) {
        updatedTrainerList.push(tList[i]);
      }
    }
    if (updatedTrainerList.length) {
      if (updatedTrainerList[removedIndex]) {
        setSelectedTrainer(updatedTrainerList[removedIndex].trainer_id)
      }
      else {
        setSelectedTrainer(updatedTrainerList[0].trainer_id)
      }

    }

    setTrainerList(updatedTrainerList)
  }

  function buttonHandler(e: any) {
    e.preventDefault();

    props.setActive(1);


    //Add 1 to the day value of date
    let a: any = startDate.split("-");
    a[2] = parseInt(a[2]) + 1;

    //make sure its in proper format
    if (a[2] < 10) {
      a[2] = "0" + a[2]
    }


    let dataBaseDate = (a[0] + "-" + a[1] + "-" + a[2]);
    let b: any = [...a];
    b[2] = parseInt(b[2]) + 7 * ammountOfWeeks;

    if (b[2] < 10) {
      b[2] = "0" + b[2]
    }
    let endDate = (b[0] + "-" + b[1] + "-" + b[2]);
    //Create our batch object
    let saveObject: any =
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
      "trainer_ids": trainerArray
    };

    //save our batch/

    axiosWrapper("batches/", "POST", saveObject).then((data) => {
      props.setView(1);
    })
  }
}