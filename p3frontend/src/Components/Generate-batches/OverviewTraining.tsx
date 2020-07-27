
import { Button } from "reactstrap";
import { Batch } from "../../models/Batch";
import { updateBatch } from "../Common/API/batch";
import { allTheMapStateToProps } from "../../redux/reducers";
import { batchUpdateActionMapper } from "../../redux/action-mapper";
import { connect } from "react-redux";
import { Interface } from "readline";
////////////////////////////////NEW LIST OF IMPORTS
import { CreateDropDown } from "./Components/CreateDropDown";
import { GerenateBatchTitleBar } from "../Common/GerenateBatchTitleBar";
import React, { useState, useEffect } from "react";
import axiosWrapper from "./functions/axiosWrapper";
import { GenerateNewBatch } from "./GenerateNewBatch";
import { FinalizeBatch } from "./FinalizeBatch";

////////////////////////////////////







export function OverviewTraining() {
  //Data pulled from database
  const [view, setView] = useState(0);
  const [active, setActive] = useState(0);


  return (
    <div>
      <GerenateBatchTitleBar pageTitle={"Generate New Batch"} active={active} setActive={setActive} setView={setView} />

      {view ? <FinalizeBatch /> : <GenerateNewBatch setActive={setActive} setView={setView} />}

    </div>//
  )
}

