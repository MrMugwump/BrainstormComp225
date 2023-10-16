import React from "react"
import { useState, useEffect } from 'react';
import EquationDisplay from "./equationDisplay";
import "./gameSceneStyle.css"

enum GameState {
    Start = 0,
    Play = 1,
    End = 2,
}

export default function GameScene() {
    const [gameState, setGameState] = useState(GameState.Start);
    const [timeEnded,setTimeEnded] = useState(false); //Returns true when timer reaches 0, timerModule modifies this.

    useEffect(()=> {
        if(timeEnded) {
            setGameState(GameState.End);
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
            <EquationDisplay
            timeEnded={timeEnded}
            setTimeEnded={setTimeEnded}/>
        </div>
    );
    
    const EndScreen = () => (
        <div className="endScreen">
            You ran out of time! Try again!
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