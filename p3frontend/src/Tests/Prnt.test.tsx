import React from 'react';
import {prnt} from '../Helpers/Prnt'

describe("test prnt", () =>{
    
    
      test("tests prnt function", () =>{
        expect(prnt(true,"blah")).toBe(undefined);
        expect(prnt(true,"blah",[{data:"blah"}])).toBe(undefined);
        expect(prnt(true,"blah",[[{data:"blah"}],[{data:"blah"}]])).toBe(undefined);
      })
  
     
  
  
    });