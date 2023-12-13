import React, { useState,useEffect } from "react"
/*
 * Graphical text box element. Takes in player input and translates it to the "userInput" variable.
 */
export default function AnswerBox({userInput, setUserInput}:any) {
    const [width, setWidth] = useState('1ch');
    const [displayText, setDisplayText] = useState('');
    const [render,setRender] = useState(false);

    useEffect(()=>{ // any time we change userInput, we update the text that is displayed.
        setDisplayText(userInput);
    },[userInput]); 

    function onInput(e:any){
        const input:string = e.target.value.replace(/[^0-9&\-]/g, ""); //removes all text other than 0123456789 and -
        setUserInput(input);
        setWidth(input.length+'ch')
    }
    function notifyUser(){
        setRender(true);
    }
    function onReselect(){
        setRender(false);
    }
    
    return (
        <>
            <TextBox render={render}/>
            <input
            className="AnswerBox"
            id="AnswerBox"
            autoComplete="off"
            value={displayText}
            onChange={e=>{onInput(e)}}
            onBlur={notifyUser}
            onFocus={onReselect}
            style={{width:`${width}`}}
            autoFocus={true} /*When instantiated, cursor auto selects.*/ />
        </>
    )
}

function TextBox({render}:any){
    if(render){
        return (
            <p>Click here!</p>
        )
    }
    return(
        <></>
    )
}