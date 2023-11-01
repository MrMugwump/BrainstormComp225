import React from "react"
import { useState, useEffect } from 'react';



export default function AnswerBox({setUserInput}:any) {
    return (
            <input
            className="AnswerBox"
            id="AnswerBox"
            onChange={e=>{setUserInput(e.target.value);}}
            autoFocus={true} /*When instantiated, cursor auto selects.*/ />
    )
}