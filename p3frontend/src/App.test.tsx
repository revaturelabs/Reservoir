import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import {shallow} from "enzyme";
import renderer from "react-test-renderer";
import ReactDOM from "react-dom";

describe("test app", () =>{
  const wrapper = shallow(<App />);
  
    test("renders single child element", () =>{
      expect(wrapper.children().length).toBe(1);
    })

   


  });
describe("test multiple describes", () =>{
  const wrapper = shallow(<App />);

  test("renders 5 routes", () =>{
    expect(wrapper.find("Route").length).toBe(5);
  })

});

describe("test routes", () =>{
    const wrapper = shallow(<App />);

  test("renders '/' route", () =>{
    expect(wrapper.find("Route[path='/']").length).toBe(1);
  })

  test("check '/' redirecting to batches in progress component name", () =>{
    expect(wrapper.find("Route[path='/']").contains("Batches in Progress"));
  })

  test("check '/' redirecting to ReduxInProgress component", () =>{
    expect(wrapper.find("Route[path='/']").contains("ReduxInProgress"));
  })

  test("renders '*' route", () =>{
    expect(wrapper.find("Route[path='*']").length).toBe(1);
  })

  test("check '*' redirecting to batches in progress component name", () =>{
    expect(wrapper.find("Route[path='*']").contains("Batches in Progress"));
  })

  test("check '*' redirecting to ReduxInProgress component", () =>{
    expect(wrapper.find("Route[path='*']").contains("ReduxInProgress"));
  })

  test("renders '/home' route", () =>{
    expect(wrapper.find("Route[path='/home']").length).toBe(1);
  })

  test("check '/home' corresponding to batches in progress component name", () =>{
    expect(wrapper.find("Route[path='/home']").contains("Batches in Progress"));
  })

  test("check '/home' corresponding to ReduxInProgress component", () =>{
    expect(wrapper.find("Route[path='/home']").contains("ReduxInProgress"));
  })

  test("renders '/batch/demand-overview' route", () =>{
    expect(wrapper.find("Route[path='/batch/demand-overview']").length).toBe(1);
  })

  test("check '/batch/demand-overview' corresponding to Supply & Demand component name", () =>{
    expect(wrapper.find("Route[path='/batch/demand-overview']").contains("Supply & Demand"));
  })

  test("check '/batch/demand-overview' corresponding to OverviewClientDemand component", () =>{
    expect(wrapper.find("Route[path='/batch/demand-overview']").contains("OverviewClientDemand"));
  })

  test("renders '/batch/training-overview' route", () =>{
    expect(wrapper.find("Route[path='/batch/training-overview']").length).toBe(1);
  })

  test("check '/batch/training-overview' corresponding to Generate Batches component name", () =>{
    expect(wrapper.find("Route[path='/batch/training-overview']").contains("Generate Batches"));
  })

  test("check '/batch/training-overview' corresponding to OverviewTraining component", () =>{
    expect(wrapper.find("Route[path='/batch/training-overview']").contains("OverviewTraining"));
  })
})

  describe("Application Snapshots", () =>{
        
    test("renders App component without crashing", () =>{
      const div = document.createElement("div");
      document.body.appendChild(div);
      ReactDOM.render(<App />, div);
    });
  
  });