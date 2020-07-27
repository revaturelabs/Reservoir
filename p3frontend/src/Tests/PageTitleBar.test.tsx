import React from 'react';
import { render } from '@testing-library/react';
import {PageTitleBar} from '../Components/Common/PageTitleBar';
import {shallow} from "enzyme";

describe("testing base PageTitleBar component", () =>{
    const wrapper = shallow(<PageTitleBar pageTitle="insanity"/>);

        test("test a basic render", () => {
            expect(wrapper.text()).toBe("<Container />");
        })

        test("test number of elements rendered", () =>{
            expect(wrapper.getElements().length).toBe(1);
        })
    
        test("test component name", () =>{
            expect(wrapper.name()).toBe("div");
        })
    
        test("check for component within wrapper", () =>{
            expect(wrapper.find(PageTitleBar)).toEqual({});
        })

});