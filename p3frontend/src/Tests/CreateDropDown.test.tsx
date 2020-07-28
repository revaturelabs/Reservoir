import React from 'react';
import {CreateDropDown} from '../Components/Generate-batches/Components/CreateDropDown'
import {shallow} from "enzyme";
describe("test CreateDropdown", () =>{
    
    
      test("renders varying number of children", () =>{
        const records=["blah","blahblah"];
        function skillHandler()
        {

        }
        const wrapper = shallow(<CreateDropDown records={records} handler={skillHandler} keyValue={["skillSetId","skillSetName"]} defaultMessage="Select Skill" defaultVal={4}/>);
        const wrapper2 = shallow(<CreateDropDown records={[]} handler={skillHandler} keyValue={["skillSetId","skillSetName"]} defaultMessage="Select Skill" defaultVal={"none"}/>);
        expect(wrapper.children().length).toBe(3);
        expect(wrapper2.children().length).toBe(0);
      })
  
     
  
  
    });