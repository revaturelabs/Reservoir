import React from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Row,
  Col,
} from "reactstrap";

export default function StackedDropDown(props: any) {
  function getCorrectValue(s: any) {
    switch (props.type) {
      case "client":
        return s.clientId;
        break;
      case "skillSet":
        return s.skillSetId;
        break;
      default:
        return s;
        break;
    }
  }

  function getCorrectDisplay(s: any) {
    switch (props.type) {
      case "client":
        return s.name;
        break;
      case "skillSet":
        return s.name;
        break;
      default:
        return `Batch ${s}`;
        break;
    }
  }

  return (
    <Dropdown isOpen={props.dropDownOpen} toggle={props.toggle}>
      <DropdownToggle
        caret
        className="viewOrangeBtn"
        data-toggle="dropdown"
        araia-expanded={props.dropDownOpen}
      >
        {props.dropItem ? props.dropItem : props.default}
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem key={props.default} onClick={props.callBack}>
          {props.default}
        </DropdownItem>
        {props.dropObjects &&
          props.dropObjects.map((s: any) => {
            return (
              <DropdownItem
                value={getCorrectValue(s)}
                onClick={(e) => props.callBack(e)}
              >
                {getCorrectDisplay(s)}
              </DropdownItem>
            );
          })}
      </DropdownMenu>
    </Dropdown>
  );
}
