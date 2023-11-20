import React, { useState } from "react"

/*
 * Graphical text box element. Takes in player input and translates it to the "userInput" variable.
 */
export default function AnswerBox({setUserInput,listOfAnswers}:any) {
    const [width, setWidth] = useState('1ch');
    function onInput(input:string){
        setUserInput(input);
        setWidth(input.length+'ch')
    }
    return (
            <input
            className="AnswerBox"
            id="AnswerBox"
            onChange={e=>{onInput(e.target.value)}}
            style={{width:`${width}`}}
            autoFocus={true} /*When instantiated, cursor auto selects.*/ />
    )
}