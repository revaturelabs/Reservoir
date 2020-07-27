import React, { useState, useEffect } from "react";
import { FinalizeSpecificBatch } from "./FinalizeBatchGroup/FinalizeSpecificBatch";
import { DisplayBatchs } from "./FinalizeBatchGroup/DisplayBatchs";

////////////////////////////////////







export function FinalizeBatch() {
  //Data pulled from database
  const [view, setView] = useState(0);
  const [batchId, setBatchId] = useState();

  return (
    <div>
      {view ? <FinalizeSpecificBatch setView={setView} batchId={batchId} /> : <DisplayBatchs setBatch={setBatchId} batch={batchId} setView={setView} />}
    </div>
  )
}

