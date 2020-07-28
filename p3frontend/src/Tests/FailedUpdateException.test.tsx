import React from 'react';
import {shallow} from "enzyme";
import {FailedUpdateException} from '../Components/Common/Exceptions/FailedUpdateException';
describe("test failed update exception", () =>{
    
    
      test("checks constructed equality of update", () =>{
        expect(new FailedUpdateException("blah")).toStrictEqual(new FailedUpdateException("blah"));
      })
  
    });