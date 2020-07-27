import React from 'react';
import { render } from '@testing-library/react';
import {DualTables} from '../Components/Batches-in-progress/Batch-info/DualTables';
import {shallow} from "enzyme";
import renderer from "react-test-renderer";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

describe("test DualTables", () =>{
    function move(){
        console.log("moved")
    }
    const wrapper = shallow(<DualTables parentTop={"string?"}
    arrayLeft={[1,2]} 
    arrayRight={[3,4]}
    messageLeft={"message left"} 
    messageRight={"message right"} 
    headerLeft={"left header"} 
    headerRight={"right hader"} 
    onMoveToLeft={(item) => move()} 
    onMoveToRight={(item) => move()}/>);

    test("test a basic render", () => {
        expect(wrapper.text()).toBe( "<Row />");
    })

    test("test number of elements rendered", () =>{
        expect(wrapper.getElements().length).toBe(1);
    })

    test("test component name", () =>{
        expect(wrapper.name()).toBe("Row");
    })

    test("check for component within wrapper", () =>{
        expect(wrapper.find(DualTables)).toEqual({});
    })

    test("renders child components when passed in", () =>{
        function move(){
            console.log("moved")
        }
        const wrapper = shallow(<DualTables parentTop={"string?"}
        arrayLeft={[1,2]} 
        arrayRight={[3,4]}
        messageLeft={"message left"} 
        messageRight={"message right"} 
        headerLeft={"left header"} 
        headerRight={"right hader"} 
        onMoveToLeft={(item) => move()} 
        onMoveToRight={(item) => move()}>
        <div className="???"></div>
        </DualTables>);
        expect(wrapper.contains(<div className="???"></div>));
    })


    
    //   test("renders single child element", () =>{
    //     function move(){
    //         console.log("moved")
    //     }
    //     const div = document.createElement("div");
    //     document.body.appendChild(div);
    //     ReactDOM.render(<DualTables parentTop={"string?"}
    //                                 arrayLeft={[1,2]} 
    //                                 arrayRight={[3,4]}
    //                                 messageLeft={"message left"} 
    //                                 messageRight={"message right"} 
    //                                 headerLeft={"left header"} 
    //                                 headerRight={"right hader"} 
    //                                 onMoveToLeft={(item) => move()} 
    //                                 onMoveToRight={(item) => move()}/>, div)

    //   })

    });