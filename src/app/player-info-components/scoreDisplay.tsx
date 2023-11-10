import React from "react"

/*
 * Graphical text element that presents the user's score.
 */
export function ScoreDisplay({score}:any){
    function calcScore(score:number){
    }
    return(<>
        <div style={{
            border: `2px solid black`
        }}>
            <p>Score: {score}</p>
        </div>
    </>)
}