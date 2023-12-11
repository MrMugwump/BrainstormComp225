'use client'; // pretty sure this gets rid of one hydration error
import React from "react"
import { useState, useEffect } from 'react';
import TimerModule from "./timer";
import "./equationDisplayStyle.css"
import {Generator} from './generator'
import {Operator} from './generator'
import { motion, useAnimation } from "framer-motion";

/**
 * Single equation box on screen: randomized equation and timer.
 */
export default function EquationDisplay({userInput,setUserInput,difficulty,setDifficulty,score,setScore,setLivesRemaining,boxID,currAnswers,setCurrAnswers,dark,settings}:any){
    const [variableLocation,setVariableLocation] = useState(2); //This variable keeps track of which location is the equation's solution.
    const [key, setKey] = useState(0); //This is used to reset the display instantly (no transition time for timer).
    
    const [timeEnded,setTimeEnded] = useState(false); //For timer: Returns true when timer reaches 0.

    const [generator] = useState(()=>{ // prevents weird issues where .generateProblem() gets called any time React calls a new render
        var gen = new Generator();
        gen.genEquationWithLocation(difficulty,currAnswers,boxID); 
        setCurrAnswers((_currAnswers:number[])=>{
            _currAnswers[boxID]=terms[2];
            return _currAnswers});
        return gen;
    });

    const controls = useAnimation(); // used to trigger animations

    const animiations = { // all the animations used in this element
        shake: {
            rotateZ: [-3,3,-3,3,-3,3,0],
            transition: {duration: 1,ease:'linear'}
        },
        flashGreen: {
            scale: ['100%','102%','100%'], //should use a different method, this messes up some css stuff
            boxShadow: ['3px 3px 3px #000000aa', '5px 5px 5px #60d056aa', '3px 3px 3px #000000aa'],
            transition: {duration: 0.5}
        }
    }

    //Variables keeping track of the numbers and operator of the equation.
    var terms:number[] = [generator.firstNumber,generator.secondNumber,generator.solution];
    var operator:Operator = generator.operator;

    /**
     * Generates a new equation and sets "terms" and "operator" to match the new equation.
     */
    function generateEquation(){
        var generatorOutput:any[] = generator.genEquationWithLocation(difficulty,currAnswers,boxID);
        terms = [generatorOutput[0],generatorOutput[2],generatorOutput[3]];
        operator = generator.operator;
        setCurrAnswers((_currAnswers:number[])=>{
            _currAnswers[boxID]=terms[2];
            return _currAnswers});
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
        //(document.getElementById('AnswerBox') as HTMLInputElement).value='';
        setKey((_key)=>_key+1); // instantly fully refresh display and timer
        generateEquation();
    }

    /**
     * Checks when the user types: if they get the correct answer, trigger.
     */
    useEffect(()=>{ //triggers when they type
        if(userInput==String(terms[variableLocation])){ //if the userInput is the correct answer: new equation & increase difficulty
            setDifficulty(Number(difficulty) + 1);
            setScore(Number(score)+1);
            resetDisplay();
            controls.start('flashGreen');
        }
    }, [userInput]);

    /**
     * Checks for when the timer runs out of time.
     */
    useEffect(()=>{ // triggers when time runs out
        if(timeEnded){
            setLivesRemaining((_livesRemaining:number)=>{return(_livesRemaining - 1)}); // decrement # of lives remaining
            resetDisplay();
            setTimeEnded(false);
            controls.start('shake');
        }
    }, [timeEnded]);

    /**
     * Returns the equationDisplay. Returns graphics of the box with equation and timer.
     */
    return (
    <>
        <div style={{padding:`5px`}}>
            <motion.table className="EquationDisplay"
             animate= {controls}
             variants={animiations}>
                <tbody key = {key}>
                    <tr>
                        <TimerSlot render = {boxID%2==1} setTimeEnded={setTimeEnded} settings={settings}/>

                        <td className="TextSlot"><NumberSlot number = {terms[0]} isVariable = {variableLocation==0}/></td>
                        <td className="TextSlot"><p>{operator}</p></td>
                        <td className="TextSlot"><NumberSlot number = {terms[1]} isVariable = {variableLocation==1}/></td>
                        <td className="TextSlot">=</td>
                        <td className="TextSlot"><NumberSlot number = {terms[2]} isVariable = {variableLocation==2}/></td>

                        <TimerSlot render = {boxID%2==0} setTimeEnded={setTimeEnded}
                                        settings={settings}/>
                        {/* Additional text for debugging: variableLocation, terms+operator */}

                        {/* <td><p>thing worked = {currAnswers.toString()}</p></td> UNCOMMENT: to see location variable */}
                        {/* <td><p>{eq[0]+operator+eq[1]+'='+eq[2]}</p></td> */} {/* UNCOMMENT: to see generator's output */}

                    </tr>
                </tbody>
            </motion.table>
        </div>
    </>
    );
}

function TimerSlot({render,settings,setTimeEnded}:any){
    //const [timeEnded,setTimeEnded] = useState(false);
    const [interval] = useState(100); //Rate of timer's checks for updates
    const [timeLength] = useState(Math.trunc(settings.getTimerSpeed()*1000)); //Length of timer
    const [localTimeEnded,localSetTimeEnded] = useState(false);
    useEffect(()=>{
        setTimeEnded(localTimeEnded);
    },[localTimeEnded]);
    if(render){
    return(<>
            <td className="TimerCell">
                            <TimerModule
                            timerLength={timeLength}
                            setTimeEnded={setTimeEnded}
                            interval={interval}/>
                        </td>
        </>
    );
    }
    else {
        return(<></>)
    }
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