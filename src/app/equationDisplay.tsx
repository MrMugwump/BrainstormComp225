import { Console } from "console";
import React from "react"
import { useState, useEffect } from 'react';
import TimerModule from "./timer";
import "./equationDisplayStyle.css"

export default function EquationDisplay({}:any){
    const equation: [firstVar:number, secondVal:number, answer:any] = [1,2,3];
    var operation = '+';
    const inputArray = [false,false,false];
    const [inputVal,setInputVal] = useState('');
    const [isCorrect, setIsCorrect] = useState('incorrect');
    const [location,setLocation] = useState(generateRandomInteger(0,2));
    const [key, setKey] = useState(0);
    const [timeEnded,setTimeEnded] = useState(1);
    const [interval,setInterval] = useState(100); 
    const [timeLength,setTimeLength] = useState(10000);
    console.log("test")
    //print("test");
    inputArray[location] = true;
    useEffect(()=>{
        if(inputVal==equation[location]){
            inputArray[location] = false;
            setLocation(generateRandomInteger(0,2));
            inputArray[location] = true;
            setIsCorrect('correct!');
            setKey((_key)=>_key+1);
            setInputVal('');
        }
        else{
            setIsCorrect('incorrect');
        }
    }, [inputVal]);
    return(<>
        <table key = {key} className="EquationDisplay">
        <tbody>
            <tr>
                <td><NumberSlot number = {equation[0]} isInput = {inputArray[0]} inputVal={setInputVal}/></td>
                <td><p>{operation}</p></td>
                <td><NumberSlot number = {equation[1]} isInput = {inputArray[1]} inputVal={setInputVal}/></td>
                <td>=</td>
                <td><NumberSlot number = {equation[2]} isInput = {inputArray[2]} inputVal={setInputVal}/></td>
                <td><p>Input = {inputVal}</p></td>
                <td><p>Correct = {isCorrect}</p></td>
                <td><p>location = {location}</p></td>
                <td className="timercell"><TimerModule
                    timerLength={timeLength}
                    timeEnded={timeEnded}
                    interval={interval}/></td>
            </tr>
        </tbody>
        </table>
        </>)
}

function NumberSlot({number = 0, isInput = false, inputVal}:any){
    if (isInput){
        return(<><input onChange={e=>{inputVal(e.target.value)}} autoFocus={true}/></>)
    }
    return(<><p>{number}</p></>)
}

function generateRandomInteger(min: number, max: number){ // Taken from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    min = Math.ceil(min);
    max = Math.floor(max)+1; //+1 to make max inclusive inclusive
    return Math.floor(Math.random() * (max - min) + min); // The maximum and the minimum are inclusive
}