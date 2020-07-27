import React, { useState, useEffect } from "react";
import axiosWrapper from "../functions/axiosWrapper";


////////////////////////////////////
export function DisplayBatchs(props: any) {
    const [batch, setBatch]: any = useState([]);

    useEffect(() => {
        axiosWrapper("/batches/uncommited", "GET").then((data) => {
            setBatch(data);
        });
    }, []);
    const tableTittle = ["Location", "Curriculum", "Start-Date", "Batch Capacity"];

    //the button names and their given onclicks
    const allButtons: any[any] = [["Update", handleUpdate], ["Confirm Batch", handleConfirm], ["Delete", handleDelete]];

    return (
        <div>
            <h3>Unconfirmed Batches</h3>
            <table>
                <thead>
                    <tr>
                        {tableTittle.map((data, index) => {
                            return (
                                <td key={index}>{data}</td>
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

                                style={colorBac ? { backgroundColor: "gray" } : { backgroundColor: "silver" }}
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

            {allButtons.map((data: any, index: any) => {
                return (<button key={index} className="button button1" disabled={props.batch ? false : true} onClick={data[1]}>{data[0]}</button>)
            })}

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