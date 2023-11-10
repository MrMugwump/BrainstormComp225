'use client'; // pretty sure this gets rid of one hydration error
import React from "react"
import { useState, useEffect } from 'react';
import TimerModule from "./timer";
import "./equationDisplayStyle.css"
import {Generator} from './generator'
import LivesDisplay from "./lives"
import "./livesStyle.css";

export default function EquationDisplay({userInput,setUserInput,difficulty,setDifficulty,livesRemaining,setLivesRemaining}:any){
    const [variableLocation,setVariableLocation] = useState(2); //This variable keeps track of which location is our input now
    const [key, setKey] = useState(0); //This is used to reset the display instantly (no transition time for timer).

    const [interval] = useState(100); //For timer: Rate of timer's checks for updates
    const [timeLength] = useState(10000); //For timer: Total number of miliseconds before the timer reaches 0.
    const [timeEnded,setTimeEnded] = useState(false); //For timer: Returns true when timer reaches 0.

    /**
     * Initialize equation generator class. Takes and modifies 'difficulty' variable.
     */
    const [generator] = useState(()=>{
        var gen = new Generator();
        gen.generateProblem(difficulty); // prevents weird issues where .generateProblem() gets called any time React calls a new render
        return gen;
    });

    const [eq,setEq] = useState([generator.firstNumber,generator.secondNumber,generator.solution]);
    const [operation, setOperation] = useState(generator.operator);

    function generateEquation(){
        var problem:any[] = generator.generateProblem(difficulty);
        setEq([problem[0],problem[2],problem[3]]);
        setOperation(generator.operator);
    }

    function resetDisplay(){
        //UNCOMMENT for algebra, chooses random location for player input
        //setVariableLocation(Math.floor((Math.random()*3)));

        setUserInput(''); //set input to blank because nothing has been typed yet
        (document.getElementById('AnswerBox') as HTMLInputElement).value='';
        setKey((_key)=>_key+1); // instantly fully refresh display
    }

    useEffect(()=>{ //triggers when they type
        if(userInput==String(eq[variableLocation])){
            setDifficulty(difficulty + 1);
            generateEquation();
            resetDisplay();
        }
    }, [userInput]);

    useEffect(()=>{ // triggers when time runs out
        if(timeEnded){
            setLivesRemaining(livesRemaining - 1); // decrement # of lives remaining
            livesRemaining = {livesRemaining};
            generateEquation();
            resetDisplay();
            setTimeEnded(false);
        }
    },[timeEnded]);

    return(<>
    <div style={{padding:`5px`}}>
        <table key = {key} className="EquationDisplay">
        <tbody>
            <tr>
                <td className="TextSlot"><NumberSlot number = {eq[0]} isVariable = {variableLocation==0}/></td>
                <td className="TextSlot"><p>{operation}</p></td>
                <td className="TextSlot"><NumberSlot number = {eq[1]} isVariable = {variableLocation==1}/></td>
                <td className="TextSlot">=</td>
                <td className="TextSlot"><NumberSlot number = {eq[2]} isVariable = {variableLocation==2}/></td>
                <td className="timercell">
                    <TimerModule
                    timerLength={timeLength}
                    setTimeEnded={setTimeEnded}
                    interval={interval}/>
                </td>
                <p>{livesRemaining}</p>
                {/* <td><p>location = {location}</p></td> */}
                {/* <td><p>{eq[0]+operation+eq[1]+'='+eq[2]}</p></td> */}
                {/* <td className="timercell"><p>diff = {difficulty}</p></td> */}
                {/* <td><p>{generator.debugVar}</p></td> */}
            </tr>
        </tbody>
        </table>
        </div>
        </>)
}

function NumberSlot({number, isVariable}:any){
    if (isVariable){
        return(<p>?</p>)
    } else {
        return(<p>{number}</p>)
    }
}

function generateRandomInteger(min: number, max: number){ // Taken from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    min = Math.ceil(min);
    max = Math.floor(max)+1; //+1 to make max inclusive
    return Math.floor(Math.random() * (max - min) + min); // The maximum and the minimum are inclusive
}
