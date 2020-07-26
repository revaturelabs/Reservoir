import React from "react";



/*
This function takes in the props
records:The Array of record objects
keyVal: an array of keyValue pairs coresponding to the 
handler: The event listener in charge of changin the values
defaultMessage: The default displayed value

*/
export function CreateDropDown(props: any) {

    //Get NEEDED data from the props
    let keyVal: Array<any> = props.records;
    if (props.records.length != 0) {
        return (
            <select key={props.keyValue[0]} onChange={props.handler} defaultValue={props.defaultVal ? props.defaultVal : "none"} className={props.className} id={props.myId ? props.myId : "DropDown"}>
                <option value="none" disabled hidden key={props.keyValue[1]}>{props.defaultMessage}</option>
                {keyVal.map((data: any, id) => {
                    return (
                        <option key={id} value={data[props.keyValue[0]]} >{data[props.keyValue[1]]}</option>
                    )
                })
                }
            </select>
        )
    }
    return <div />
}

//