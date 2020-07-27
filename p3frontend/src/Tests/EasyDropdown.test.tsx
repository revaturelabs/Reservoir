import React from 'react';
import { render } from '@testing-library/react';
import {EasyDropdown} from '../Components/Common/EasyDropdown';
import {shallow} from "enzyme";

describe("testing base EasyDropdown component", () =>{
    function why(){
        console.log("im dying");
    }
    const wrapper = shallow(<EasyDropdown 
        onSelected={() =>  why }
        selectedItem={"?!?!?!?!?????!?!?!!?!?!"} 
        items={["???", "?????????????????????????"]} />);

        test("test a basic render", () => {
            expect(wrapper.text()).toBe("<UncontrolledDropdown /><EasyTooltip />");
        })

        test("test number of elements rendered", () =>{
            expect(wrapper.getElements().length).toBe(1);
        })
    
        test("test component name", () =>{
            expect(wrapper.name()).toBe("Fragment");
        })
    
        test("check for component within wrapper", () =>{
            expect(wrapper.find(EasyDropdown)).toEqual({});
        })

});