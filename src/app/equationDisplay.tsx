'use client'; // pretty sure this gets rid of one hydration error
import React from "react"
import { useState, useEffect } from 'react';
import TimerModule from "./timer";
import "./equationDisplayStyle.css"
import {Generator} from './generator'
import {Operator} from './generator'

/**
 * Single equation box on screen: randomized equation and timer.
 */
export default function EquationDisplay({userInput,setUserInput,difficulty,setDifficulty,livesRemaining,setLivesRemaining}:any){
    const [variableLocation,setVariableLocation] = useState(2); //This variable keeps track of which location is the equation's solution.
    const [key, setKey] = useState(0); //This is used to reset the display instantly (no transition time for timer).

    const [interval] = useState(100); //For timer: Rate of timer's checks for updates
    const [timeLength] = useState(10000); //For timer: Total number of miliseconds before the timer reaches 0.
    const [timeEnded,setTimeEnded] = useState(false); //For timer: Returns true when timer reaches 0.

    const [generator] = useState(()=>{
        var gen = new Generator();
        gen.generateEquation(difficulty); // prevents weird issues where .generateProblem() gets called any time React calls a new render
        return gen;
    });

    //Variables keeping track of the numbers and operator of the equation.
    var terms:number[] = [generator.firstNumber,generator.secondNumber,generator.solution];
    var operator:Operator = generator.operator;

    /**
     * Generates a new equation and sets "terms" and "operator" to match the new equation.
     */
    function generateEquation(){
        var generatorOutput:any[] = generator.generateEquation(difficulty);
        terms = [generatorOutput[0],generatorOutput[2],generatorOutput[3]];
        operator = generator.operator;

        //UNCOMMENT for algebra, chooses random location for player input
        //setVariableLocation(Math.floor((Math.random()*3)));
    }

    /**
     * Generates a new equationDisplay and clears player input.
     *  - Resets timer
     *  - Generates new equations and displays it
     *  - Clears player input
     */
    function resetDisplay(){
        setUserInput(''); //set input to blank because nothing has been typed yet
        (document.getElementById('AnswerBox') as HTMLInputElement).value='';
        setKey((_key)=>_key+1); // instantly fully refresh display

        generateEquation();
    }

    /**
     * Checks when the user types: if they get the correct answer, trigger.
     */
    useEffect(()=>{ //triggers when they type
        if(userInput==String(terms[variableLocation])){ //if the userInput is the correct answer: new equation & increase difficulty
            setDifficulty(difficulty + 1);
            resetDisplay();
        }
    }, [userInput]);

    /**
     * Checks for when the timer runs out of time.
     */
    useEffect(()=>{ // triggers when time runs out
        if(timeEnded){
            setLivesRemaining((_livesRemaining:number)=>{return(_livesRemaining - 1)}); // decrement # of lives remaining
            livesRemaining = {livesRemaining};
            resetDisplay();
            setTimeEnded(false);
        }
    }, [timeEnded]);

    /**
     * Returns the equationDisplay. Returns graphics of the box with equation and timer.
     */
    return (
    <>
        <div style={{padding:`5px`}}>
            <table key = {key} className="EquationDisplay">
                <tbody>
                    <tr>

                        <td className="TextSlot"><NumberSlot number = {terms[0]} isVariable = {variableLocation==0}/></td>
                        <td className="TextSlot"><p>{operator}</p></td>
                        <td className="TextSlot"><NumberSlot number = {terms[1]} isVariable = {variableLocation==1}/></td>
                        <td className="TextSlot">=</td>
                        <td className="TextSlot"><NumberSlot number = {terms[2]} isVariable = {variableLocation==2}/></td>
                        
                        <td className="TimerCell">
                            <TimerModule
                            timerLength={timeLength}
                            setTimeEnded={setTimeEnded}
                            interval={interval}/>
                        </td>

                        {/* Additional text for debugging: variableLocation, terms+operator */}

                        {/* <td><p>variableLocation = {location}</p></td> */} {/* UNCOMMENT: to see location variable */}
                        {/* <td><p>{eq[0]+operator+eq[1]+'='+eq[2]}</p></td> */} {/* UNCOMMENT: to see generator's output */}

                    </tr>
                </tbody>
            </table>
        </div>
    </>
    );
}

/**
 * Box that holds one term of the equation. Either returns the number itself, or if it is the solution, returns "?"
 */
function NumberSlot({number, isVariable}:any){
    if (isVariable){
        return(<p>?</p>)
    } else {
        return(<p>{number}</p>)
    }
}