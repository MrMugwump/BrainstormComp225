import React from "react"
import { useState, useEffect } from 'react';
import EquationDisplay from "./equationDisplay";
import "./gameSceneStyle.css"
import { OperationDisplay } from "./player-info-components/operationNotification";
import { ScoreDisplay } from "./player-info-components/scoreDisplay";
import { ShakeDaBox } from "./testingShaking";
import { motion, useAnimation } from "framer-motion";

enum GameState {
    Start = 0,
    Play = 1,
    End = 2,
}

export default function GameScene() {
    const [gameState, setGameState] = useState(GameState.Start);
    const [timeEnded,setTimeEnded] = useState(false); //Returns true when timer reaches 0, timerModule modifies this.
    const [difficulty, setDifficulty] = useState(0);
    const controls = useAnimation();
    

    useEffect(()=> {

        if(timeEnded) {
            controls.start(i=>({
                rotateZ: [0, -5, 5, -5, 5, -5, 5, 0],
                transition: { duration: 1 }
            }))
            //setGameState(GameState.End);
        }
    },[timeEnded]);


    const StartScreen = () => (
        <div className="startScreen">
            Press here to start the game.
            <br/><br/>
            {StartButton()}
        </div>
    );
    
    const PlayScreen = () => (
        <div className="playScreen">
            <div style={{
            position: `fixed`,
            right: `10px`
            }}>
                <ScoreDisplay difficulty = {difficulty}/>
            </div>
            <motion.div
                custom={1}
                animate={controls}
                style={{position:`fixed`}}>
            <EquationDisplay
            timeEnded={timeEnded}
            setTimeEnded={setTimeEnded}
            setDifficulty={setDifficulty}/>
            </motion.div>
            <div><ShakeDaBox/></div>
            
            <div style={{
                position: `fixed`,
                bottom: `0`,
                right: `0`
            }}>
                <OperationDisplay difficulty={difficulty}/>
            </div>
        </div>

    );
    
    const EndScreen = () => (
        <div className="endScreen">
            You ran out of time! Try again!
            <br/><br/>
            Your score was: {difficulty}
            <br/><br/>
            {StartButton()}
        </div>
    );

    const StartButton = () => (
        <button className="startButton" onClick={()=>{
            setGameState(GameState.Play);
        }}>Begin Game</button>
    );

    if(gameState==GameState.Start) {
        return (StartScreen());
    } else if(gameState==GameState.Play) {
        return (PlayScreen());
    } else if(gameState==GameState.End) {
        return (EndScreen());
    } else {
        return <></>;
    }
}