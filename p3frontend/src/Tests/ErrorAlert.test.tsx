import React from 'react'
import {ErrorAlert} from '../Helpers/ErrorAlert'
import {shallow} from "enzyme";


describe("test app", () =>{
    let e={config:{method:"blah",baseUrl:"blah2",url:"www.test.com"}};
    const wrapper = shallow(<ErrorAlert error={e} message={"Error has occured"}/>);
    
      test("renders single child element", () =>{
        expect(wrapper.children().length).toBe(5);
      })
  
     
  
  
    });