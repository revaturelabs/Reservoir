import {CreateDropDown} from "../Components/CreateDropDown";
import { PageTitleBar } from "../../Common/PageTitleBar";
import React, { useState, useEffect } from "react";
import axiosWrapper from "../functions/axiosWrapper";
import { GenerateNewBatch } from "../GenerateNewBatch";

////////////////////////////////////






//This is for displaying our current selected batch to modify
export function FinalizeSpecificBatch(props:any)
{
  const [selectedBatch, setSelectedBatch]=useState({});
  
  useEffect(()=>{
    
    axiosWrapper("/batches/"+props.batchId,"GET").then((data)=>{
      setSelectedBatch(data);  
    })

  },[])
  console.log(selectedBatch)
  return(
    <div>

      <h4>{JSON.stringify(selectedBatch)}</h4>

    </div>
  )
}

