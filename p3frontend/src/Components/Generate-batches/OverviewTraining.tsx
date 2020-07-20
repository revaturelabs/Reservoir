
import { Button } from "reactstrap";
import { Batch } from "../../models/Batch";
import { updateBatch } from "../Common/API/batch";
import { allTheMapStateToProps } from "../../redux/reducers";
import { batchUpdateActionMapper } from "../../redux/action-mapper";
import { connect } from "react-redux";
import { Interface } from "readline";
////////////////////////////////NEW LIST OF IMPORTS
import {CreateDropDown} from "./Components/CreateDropDown";
import { PageTitleBar } from "../Common/PageTitleBar";
import React, { useState, useEffect } from "react";
import axiosWrapper from "./functions/axiosWrapper";
import { GenerateNewBatch } from "./GenerateNewBatch";
import { FinalizeBatch } from "./FinalizeBatch";

////////////////////////////////////







export function OverviewTraining()
{
  //Data pulled from database
  const [view, setView] = useState(0);


  return(
    <div>
      <PageTitleBar pageTitle={"Generate New Batchs"}/>
      <div>
        {view ? 
        <h5 onClick={()=>setView(0)} className="float-right">--Initialize A Batch--</h5>:
        <h5 onClick={()=>setView(1)} className="float-right">--Finalize A Batch--</h5>}
      </div>
      {view ? <FinalizeBatch/>:<GenerateNewBatch/>}

    </div>//
  )
}

