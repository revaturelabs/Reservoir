import { CreateDropDown } from "../Components/CreateDropDown";
import { PageTitleBar } from "../../Common/PageTitleBar";
import React, { useState, useEffect } from "react";
import axiosWrapper from "../functions/axiosWrapper";
import { GenerateNewBatch } from "../GenerateNewBatch";
import { allTheMapStateToProps } from "../../../redux/reducers";

////////////////////////////////////
export function DisplayBatchs(props: any) {
    const [batch, setBatch]: any = useState([]);
    const [selectedBatch, setSelectedBatch]: any = useState();

    useEffect(() => {
        axiosWrapper("/batches/uncommited", "GET").then((data) => {
            setBatch(data);
        });
    }, []);
    const tableTittle = ["Location", "Curriculum", "Start-Date", "Batch Capacity"];

    //the button names and their given onclicks
    const allButtons: any[any] = [
        ["Delete", handleDelete, "btn btn-danger finilize-batch-delete"],
        ["Update", handleUpdate, "btn btn-primary finilize-batch-update"],
        ["Confirm Batch", handleConfirm, "btn btn-success finilize-batch-confirm"]

    ];

    return (

        <div className="container-fluid">
            <h3 className="text-center">Unconfirmed Batches</h3>
            <div className="card finilize-batch-table-container">
                <table className="table table-striped finilize-batch-table sticky">
                    <thead className="finilize-batch-table-header">
                        <tr>
                            {tableTittle.map((data, index) => {
                                return (
                                    <th key={index}>{data}</th>
                                )
                            })}
                        </tr>
                    </thead>


                    <tbody>

                        {batch.map((data: any, index: number) => {

                            //Handle the selected row
                            let colorBac = 0;
                            if (props.batch && props.batch === data.batchId) {
                                colorBac = 1;
                            }
                            return (
                                <tr key={index} onClick={() => {
                                    props.setBatch(data.batchId);
                                }}

                                    style={colorBac ? { backgroundColor: "gray", color: "#fff" } : { backgroundColor: "" }}

                                >

                                    <td key={1}>{data.location.locationName}</td>
                                    <td key={2}>{data.curriculum.name}</td>
                                    <td key={3}>{data.startDate}</td>
                                    <td key={4}>{data.batchCapacity}</td>
                                </tr>
                            )
                        })}

                    </tbody>
                </table>
            </div>
            <div className="row justify-content-center">
                {allButtons.map((data: any, index: any) => {
                    return (
                        <div className="col">
                            <button key={index} className={`finilize-batch-buttons ${data[2]}`} disabled={props.batch ? false : true} onClick={data[1]}>{data[0]}</button>
                        </div>
                    )
                })}
            </div>
        </div>
    )



    function handleUpdate() {
        props.setView(1);

    }
    function handleConfirm() {
        let removeSingleBatch = [...batch];

        axiosWrapper(`/batches/${props.batch}/confirm`, "GET").then(() => {
            //update the local state
            setBatch(removeSingleBatch.filter((value, index) => { return value.batchId != props.batch }));

            props.setBatch();
        })

    }
    function handleDelete() {
        let removeSingleBatch = [...batch];

        console.log(props.batch);
        axiosWrapper(`/batches/${props.batch}`, "DELETE").then(() => {
            //update the local state
            setBatch(removeSingleBatch.filter((value, index) => { return value.batchId != props.batch }));

            props.setBatch();
        })

    }
}



function Button(props: any) {
    let render = true;
    if (props.batch) {
        render = false;
    }
    return (
        <button className="button button1" disabled={render}>{props.name}</button>
    )
}