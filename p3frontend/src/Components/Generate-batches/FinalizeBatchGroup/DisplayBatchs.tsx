import {CreateDropDown} from "../Components/CreateDropDown";
import { PageTitleBar } from "../../Common/PageTitleBar";
import React, { useState, useEffect } from "react";
import axiosWrapper from "../functions/axiosWrapper";
import { GenerateNewBatch } from "../GenerateNewBatch";

////////////////////////////////////
export function DisplayBatchs(props:any)
{
    const [batch, setBatch]=useState([]);

    useEffect(()=>
    {
        axiosWrapper("/batches/uncommited","GET").then((data)=>
        {
            setBatch(data);
        });
    },[]);
    const tableTittle=["Location","Curriculum", "Start-Date"];

    return(
        <div>
            <h3>Uncommited Batches</h3>
            <table>
                <thead>
                    <tr>
                    {tableTittle.map((data,index)=>{
                        return(
                            <td key={index}>{data}</td>
                        )
                    })}
                    </tr>
                </thead>


                <tbody>
                 
                    {batch.map((data:any,index)=>{
                        return(
                            <tr key={index} onClick={()=>{
                                props.setBatch(data.batchId);
                                props.setView(1);
                            }}>
                                <td key={1}>{data.location.locationName}</td>
                                <td key={2}>{data.curriculum.curriculumSkillset.skillSetName}</td>
                                <td key={3}>{data.startDate}</td>
                            </tr>
                        )
                    })}
                   
                </tbody>
            </table>
        </div>
    )
}