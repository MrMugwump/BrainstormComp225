import React from "react"
import './scoreDisplayStyle.css'
import { motion, useAnimation } from "framer-motion";
import { useEffect } from 'react';
/*
 * Graphical text element that presents the user's score.
 */
export function ScoreDisplay({score}:any){
    const controls = useAnimation();

    const animations = {
        increaseScore: {
            fontSize: ['100%','110%','100%'],
            textShadow: ['#60d056 0px 0px 0px,#60d056 0px 0px 0px', '#60d056 0px 0px 0.3em, #60d056 0px 0px 0.3em','#60d056 0px 0px 0px,#60d056 0px 0px 0px'],
            transition: {duration:0.5, ease:'linear'}
        }

    }

    useEffect(()=>{
        controls.start('increaseScore');
    },[score]);

    return(<>
        <div id="score-display">
            <p style={{fontSize:'50%'}}>Score</p>
            <motion.p 
                animate={controls}
                variants={animations}>{score}</motion.p>
            
        </div>
    </>)
}