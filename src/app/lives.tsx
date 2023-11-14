import React from "react"
import { useState, useEffect } from 'react';

/**
 * Graphical display of the user's lives number.
 */
export default function LivesDisplay({setLivesRemaining, livesRemaining}:any) {
    if(livesRemaining === 3) {
        return (
            <div>
                <img src="heartMC.png" alt="3 lives remaining" className = "Heart1" id = "Heart1"></img>
                <img src="heartMC.png" className = "Heart2" id = "Heart2"></img>
                <img src="heartMC.png" className = "Heart3" id = "Heart3"></img>
            </div>
        )
    } else if(livesRemaining === 2) {
        return (
            <div>
                <img src="heartMC.png" alt="2 lives remaining" className = "Heart1" id = "Heart1"></img>
                <img src="heartMC.png" className = "Heart2" id = "Heart2"></img>
                <img src="emptyHeartMC.png" className = "Heart3" id = "Heart3"></img>
            </div>
        )
    } else if(livesRemaining === 1) {
        return (
            <div>
                <img src="heartMC.png" alt="1 life remaining" className = "Heart1" id = "Heart1"></img>
                <img src="emptyHeartMC.png" className = "Heart2" id = "Heart2"></img>
                <img src="emptyHeartMC.png" className = "Heart3" id = "Heart3"></img>
            </div>
        )
    }
    return (
        <p className = "LivesDisplay" id = "LivesDisplay">
            An error has occurred
        </p>
    )
}