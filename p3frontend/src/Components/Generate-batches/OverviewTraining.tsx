////////////////////////////////NEW LIST OF IMPORTS
import { GerenateBatchTitleBar } from "../Common/GerenateBatchTitleBar";
import React, { useState, useEffect } from "react";
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

