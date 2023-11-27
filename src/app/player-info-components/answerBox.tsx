import React, { useState,useEffect } from "react"
/*
 * Graphical text box element. Takes in player input and translates it to the "userInput" variable.
 */
export default function AnswerBox({userInput, setUserInput}:any) {
    const [width, setWidth] = useState('1ch');
    const [displayText, setDisplayText] = useState('');

    // const handleChange = (e:any) => {
    //     const input:string = e.target.value.replace(/\D/g, "");

    //     setUserInput(input);
    //     setDisplayText(input);
    //     setWidth(input.length+'ch')
    // }
    useEffect(()=>{
        setDisplayText(userInput);
    },[userInput]); 
    function onInput(e:any){
        const input:string = e.target.value.replace(/^0-9\-/g, "");
        setUserInput(input);
        // setDisplayText(input);
        setWidth(input.length+'ch')
    }
    return (
            <input
            className="AnswerBox"
            id="AnswerBox"
            value={displayText}
            onChange={e=>{onInput(e)}}
            style={{width:`${width}`}}
            autoFocus={true} /*When instantiated, cursor auto selects.*/ />
    )
}