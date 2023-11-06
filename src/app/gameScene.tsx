import React from "react"
import { useState, useEffect } from 'react';
import EquationDisplay from "./equationDisplay";
import "./gameSceneStyle.css"
import { OperationDisplay } from "./player-info-components/operationNotification";
import { ScoreDisplay } from "./player-info-components/scoreDisplay";
import AnswerBox from "./answerBox";
import "./answerBoxStyle.css";
import LivesDisplay from "./lives"
import "./livesStyle.css";

enum GameState {
    Start = 0,
    Play = 1,
    End = 2,
}

export default function GameScene() {
    const [gameState, setGameState] = useState(GameState.Start);
    const [timeEnded,setTimeEnded] = useState(false); //Returns true when timer reaches 0, timerModule modifies this.
    const [difficulty, setDifficulty] = useState(250);
    const [userInput, setUserInput] = useState(''); //represents what the user types into the answer box
    const [livesRemaining, setLivesRemaining] = useState(2);

    useEffect(()=> {
        if(timeEnded) {
            if(livesRemaining > 0) {
                // Decrement lives remaining
            } else {
                setGameState(GameState.End);
            }
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
                <ScoreDisplay score = {difficulty}/>
            </div>

            <AnswerBox
            setUserInput={setUserInput}/>

            <EquationDisplay
            timeEnded={timeEnded}
            setTimeEnded={setTimeEnded}
            userInput={userInput}
            setUserInput={setUserInput}
            difficulty={difficulty}
            setDifficulty={setDifficulty}/>
            <EquationDisplay
            timeEnded={timeEnded}
            setTimeEnded={setTimeEnded}
            userInput={userInput}
            setUserInput={setUserInput}
            difficulty={difficulty}
            setDifficulty={setDifficulty}/>

            <LivesDisplay 
            LivesDisplay = {LivesDisplay}
            livesRemaining = {livesRemaining}
            setLivesRemaining = {setLivesRemaining}/>
            
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
            Your score was: {difficulty-1}
            <br/><br/>
            {StartButton()}
        </div>
    );

    const StartButton = () => (
        <button className="startButton" onClick={()=>{
            setDifficulty(0);
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