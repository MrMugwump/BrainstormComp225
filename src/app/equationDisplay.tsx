import { Console } from "console";
import React from "react"
import { useState, useEffect } from 'react';
import TimerModule from "./timer";
import "./equationDisplayStyle.css"
import {Generator} from './generator'

export default function EquationDisplay({difficulty}:any){
    const [generator,setGenerator] = useState(new Generator(0));
    generator.generateProblem();
    const [eq,setEq] = useState([generator.firstNumber,generator.secondNumber,generator.solution]);
    //var equation: [firstVar:number, secondVal:number, answer:any] = [generator.firstNumber,generator.secondNumber,generator.solution];
    const [operation, setOperation] = useState(String(generator.operator));
    //var operation:String = '+';

    //const equation: [firstVar:number, secondVal:number, answer:any] = [generator.firstNumber,generator.secondNumber,generator.solution]; // dummy equation for testing
    
    const inputArray = [false,false,false]; //array to set which place to be input, true=input mode
    const [inputVal,setInputVal] = useState(''); //what the player types
    const [location,setLocation] = useState(generateRandomInteger(0,2)); //this variable keeps track of which location is our input now
    const [key, setKey] = useState(0); // this is used to reset the display instantly (no transition time for timer)
    const [interval,setInterval] = useState(100); //param for timer, not super necessary, will likely get rid of later
    const [timeLength,setTimeLength] = useState(10000); //param for timer
    const [timeEnded,setTimeEnded] = useState(false); //TimerModule has ability to change this, triggers a reset if true
    // const [isCorrect, setIsCorrect] = useState('incorrect'); //debugging thing
    inputArray[location] = true;

    function generateEquation(){
        var problem:any[] = generator.generateProblem();
        setEq([problem[0],problem[2],problem[3]]);
        setOperation(String(generator.operator));
    }

    function resetDisplay(){
        //choose new location for player input
        inputArray[location] = false;
        setLocation(generateRandomInteger(0,2));
        inputArray[location] = true;

        setInputVal(''); //set input to blank because nothing has been typed yet
        setKey((_key)=>_key+1); // instantly fully refresh display
    }

    useEffect(()=>{
        if(inputVal==String(eq[location])){
            generateEquation();
            resetDisplay();
            //setIsCorrect('correct!');
        }
        else{
            //setIsCorrect('incorrect');
        }
    }, [inputVal]);

    useEffect(()=>{
        if(timeEnded){
            generateEquation();
            resetDisplay();
            setTimeEnded(false);
        }
    },[timeEnded]);

    return(<>
        <table key = {key} className="EquationDisplay">
        <tbody>
            <tr>
                <td className="TextSlot"><NumberSlot number = {eq[0]} isInput = {inputArray[0]} inputVal={setInputVal}/></td>
                <td className="TextSlot"><p>{operation}</p></td>
                <td className="TextSlot"><NumberSlot number = {eq[1]} isInput = {inputArray[1]} inputVal={setInputVal}/></td>
                <td className="TextSlot">=</td>
                <td className="TextSlot"><NumberSlot number = {eq[2]} isInput = {inputArray[2]} inputVal={setInputVal}/></td>
                {/*<td><p>Correct = {isCorrect}</p></td>*/}
                {/*<td><p>location = {location}</p></td>*/}
                <td className="timercell">
                    <TimerModule
                    timerLength={timeLength}
                    actualSetTimeEnded={setTimeEnded}
                    interval={interval}/>
                </td>
                <td><p>{String(generator.generateProblem())}</p></td>
            </tr>
        </tbody>
        </table>
        </>)
}

function NumberSlot({number, isInput = false, inputVal}:any){
    const [width,setWidth]=useState('1ch');
    function onInputChange(e:any){
        inputVal(e.target.value);
        setWidth(e.target.value.length+'ch')
    }
    if (isInput){
        return( 
        <><input className="InputArea"
            onChange={e=>{onInputChange(e)} /*sends player input to eq. disp.*/} 
            autoFocus={true /*when instantiated, cursor auto selects*/} 
            style={{width: `${width}`}}
            />
            </>)
    }
    return(<><p>{number}</p></>)
}

function generateRandomInteger(min: number, max: number){ // Taken from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    min = Math.ceil(min);
    max = Math.floor(max)+1; //+1 to make max inclusive
    return Math.floor(Math.random() * (max - min) + min); // The maximum and the minimum are inclusive
}