import React from "react"
import { useState, useEffect } from 'react';

export default function EquationDisplay({}:any){
    const equation: [firstVar:number, operation:String, secondVal:number, answer:any] = [1,'+',2,3];
    const inputArray = [false,false,false,true];
    const [inputVal0,setInputVal0] = useState('');
    const [inputVal2,setInputVal2] = useState('');
    const [inputVal3,setInputVal3] = useState('null');
    const [isCorrect, setIsCorrect] = useState('incorrect');

    useEffect(()=>{
        if(inputVal3==equation[3]){
            //regenerate number
            setIsCorrect('correct!');
        }
        else{
            setIsCorrect('incorrect');
        }
    }, [inputVal3]);
    return(<>
        <table>
        <tbody>
            <tr>
                <td><NumberSlot number = {equation[0]} isInput = {inputArray[0]} inputVal={setInputVal0}/></td>
                <td><NumberSlot number = {equation[1]} isInput = {inputArray[1]}/></td>
                <td><NumberSlot number = {equation[2]} isInput = {inputArray[2]} inputVal={setInputVal2}/></td>
                <td>=</td>
                <td><NumberSlot number = {equation[3]} isInput = {inputArray[3]} inputVal={setInputVal3}/></td>
                <td><p>Input = {inputVal3}</p></td>
                <td><p>Correct = {isCorrect}</p></td>
            </tr>
        </tbody>
        </table>
        </>)
}

function NumberSlot({number = 0, isInput = false, inputVal}:any){
    if (isInput){
        return(<><input onChange={e=>{inputVal(e.target.value)}}/></>)
    }
    return(<><p>{number}</p></>)
}