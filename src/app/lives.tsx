import React from "react"
import { useState, useEffect } from 'react';
import fullHeart from './heart-images/heart_full.png';
import emptyHeart from './heart-images/heart_empty.png';

/**
 * Graphical display of the user's lives number.
 */
export default function LivesDisplay({setLivesRemaining, livesRemaining, settings}:any) {
    let startingLives = 3;
    if(settings.getIsFreeplay()) {
        startingLives = settings.getStartingLives()
    } else {
        startingLives = 3;
    }

    let table = [];
        let children = [];
        for(let i=0; i<startingLives; i++) {
                children.push(<td>
                    {nextHeart(i,livesRemaining)}
                </td>);
            }
            table.push(<tr>{children}</tr>);
        return (
            <table className="Lives">
                {table}
            </table>
        );
}

function nextHeart(pos:number, livesRemaining:number) {
    if(pos >= livesRemaining) {
        return <img src={emptyHeart.src} alt="Empty heart" className="EmptyHeart" id="EmptyHeart"/>;
    } else {
        return <img src={fullHeart.src} alt="Heart" className="FullHeart" id="FullHeart"/>;
    }
}