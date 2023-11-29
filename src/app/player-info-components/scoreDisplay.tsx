import React from "react"
import './scoreDisplayStyle.css'

/*
 * Graphical text element that presents the user's score.
 */
export function ScoreDisplay({score}:any){
    function calcScore(score:number){
    }
    return(<>
        <div id="score-display">
            <p>Score: {score}</p>
        </div>
    </>)
}