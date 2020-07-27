import React from 'react';
import { render } from '@testing-library/react';
import {PageFooter} from '../Components/Common/Footer/footer';
import {shallow} from "enzyme";

describe("testing base PageFooter component", () =>{
    const wrapper = shallow(<PageFooter/>);

        test("test a basic render", () => {
            expect(wrapper.text()).toBe("<Row />");
        })

        test("test number of elements rendered", () =>{
            expect(wrapper.getElements().length).toBe(1);
        })
    
        test("test component name", () =>{
            expect(wrapper.name()).toBe("div");
        })
    
        test("check for component within wrapper", () =>{
            expect(wrapper.find(PageFooter)).toEqual({});
        })

});