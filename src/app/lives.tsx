import React from "react"
import { useState, useEffect } from 'react';
import fullHeart from './heart-images/heartMC.png';
import emptyHeart from './heart-images/emptyHeartMC.png';

/**
 * Graphical display of the user's lives number.
 */
export default function LivesDisplay({setLivesRemaining, livesRemaining}:any) {
    return (
        <div className="Lives" id="Lives">
            {nextHeart(1, livesRemaining)}
            {nextHeart(2, livesRemaining)}
            {nextHeart(3, livesRemaining)}
        </div>
    )
}

function nextHeart(pos:number, livesRemaining:number) {
    if(pos > livesRemaining) {
        return <img src={emptyHeart.src} className="EmptyHeart" id="EmptyHeart"/>;
    } else {
        return <img src={fullHeart.src} alt="Heart" className="FullHeart" id="FullHeart"/>;
    }
}