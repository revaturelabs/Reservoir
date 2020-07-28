import React from 'react';
import {shallow} from "enzyme";
import {FailedRequestException} from '../Components/Common/Exceptions/FailedRequestException';
describe("test failed request exception", () =>{
    
    
      test("checks constructed equality", () =>{
        expect(new FailedRequestException("blah")).toStrictEqual(new FailedRequestException("blah"));
      })
  
    });