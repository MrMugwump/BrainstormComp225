import React from "react"

/*
 * Graphical text box element. Takes in player input and translates it to the "userInput" variable.
 */
export default function AnswerBox({setUserInput,listOfAnswers}:any) {
    return (
            <input
            className="AnswerBox"
            id="AnswerBox"
            onChange={e=>{setUserInput(e.target.value);}}
            autoFocus={true} /*When instantiated, cursor auto selects.*/ />
    )
}