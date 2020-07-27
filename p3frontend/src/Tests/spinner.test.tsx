import React from 'react';
import { render } from '@testing-library/react';
import {Spinner} from '../Components/Common/spinner';
import {shallow} from "enzyme";

describe("testing base PageFooter component", () =>{
    const wrapper = shallow(<Spinner area="4x4"/>);

        test("test a basic render", () => {
            expect(wrapper.text()).toBe("");
        })

        test("test number of elements rendered", () =>{
            expect(wrapper.getElements().length).toBe(1);
        })
    
        test("test component name", () =>{
            expect(wrapper.name()).toBe("Fragment");
        })
    
        test("check for component within wrapper", () =>{
            expect(wrapper.find(Spinner)).toEqual({});
        })

});