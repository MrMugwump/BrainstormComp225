import React from "react"
import { useState, useEffect } from 'react';
import EquationDisplay from "./equationDisplay";
import "./gameSceneStyle.css"
import { OperationDisplay } from "./player-info-components/operationNotification";
import { ScoreDisplay } from "./player-info-components/scoreDisplay";
import AnswerBox from "./answerBox";
import "./answerBoxStyle.css";

enum GameState {
    Start = 0,
    Play = 1,
    End = 2,
}

export default function GameScene() {
    const [gameState, setGameState] = useState(GameState.Start);
    const [timeEnded,setTimeEnded] = useState(false); //Returns true when timer reaches 0, timerModule modifies this.
    const [score, setScore] = useState(0);
    const [userInput, setUserInput] = useState(''); //represents what the user types into the answer box

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
            <div style={{
            position: `fixed`,
            right: `10px`
            }}>
                <ScoreDisplay score = {score}/>
            </div>

            <AnswerBox
            setUserInput={setUserInput}/>
            <EquationDisplay
            timeEnded={timeEnded}
            setTimeEnded={setTimeEnded}
            score={score}
            setScore={setScore}
            userInput={userInput}
            setUserInput={setUserInput}/>
            <EquationDisplay
            timeEnded={timeEnded}
            setTimeEnded={setTimeEnded}
            score={score}
            setScore={setScore}
            userInput={userInput}
            setUserInput={setUserInput}/>
            
            <div style={{
                position: `fixed`,
                bottom: `0`,
                right: `0`
            }}>
                <OperationDisplay score={score}/>
            </div>
        </div>
    );
    
    const EndScreen = () => (
        <div className="endScreen">
            You ran out of time! Try again!
            <br/><br/>
            Your score was: {score-1}
            <br/><br/>
            {StartButton()}
        </div>
    );

    const StartButton = () => (
        <button className="startButton" onClick={()=>{
            setScore(0);
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