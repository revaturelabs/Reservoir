import React from 'react';
import { render } from '@testing-library/react';
import {FilterForm} from '../Components/Batches-in-progress/FilterForm';
import {shallow} from "enzyme";
import renderer from "react-test-renderer";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

describe("testing base FilterForm component", () =>{
    function setProg(){
        console.log("this code was designed by monkeys");
    }
    function setCli(){
        console.log("this code was designed by monkeys");
    }
    function setCur(){
        console.log("this code was designed by monkeys");
    }
    const wrapper = shallow(<FilterForm
        setProgramType={setProg}
        setClient={setCli}
        setCurriculum={setCur}
        programTypeSelection={["p1","p2"]}
        clientSelection={["c1","c2"]}
        curriculumSelection={["hard","easy"]}/>);

        test("test a basic render", () => {
            expect(wrapper.text()).toBe( "<Button /><Modal />");
        })
    
        test("test number of elements rendered", () =>{
            expect(wrapper.getElements().length).toBe(1);
        })
    
        test("test component name", () =>{
            expect(wrapper.name()).toBe("Fragment");
        })
    
        test("check for component within wrapper", () =>{
            expect(wrapper.find(FilterForm)).toEqual({});
        })
})