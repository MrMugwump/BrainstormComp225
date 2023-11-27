import React from "react"
import { useState, useEffect } from 'react';
import EquationDisplay from "./equationDisplay";
import "./gameSceneStyle.css"
import { OperationDisplay } from "./player-info-components/operationNotification";
import { ScoreDisplay } from "./player-info-components/scoreDisplay";
import AnswerBox from "./player-info-components/answerBox";
import "./player-info-components/answerBoxStyle.css";
import LivesDisplay from "./lives"
import "./livesStyle.css";
import { Generator } from "./generator";

enum GameState {
    Start = 0,
    Play = 1,
    End = 2,
}

/**
 * Handles the "gameplay" portion of the website. Handles the starting screen, gameplay screen, and end screen.
 */
export default function GameScene() {
    const [gameState, setGameState] = useState(GameState.Start);
    const [difficulty, setDifficulty] = useState(0);
    const [userInput, setUserInput] = useState(''); //represents what the user types into the answer box
    const [livesRemaining, setLivesRemaining] = useState(3);
    const [currAnswers, setCurrAnswers] = useState([0,0,0,0]);
    const [boxes, setBoxes] = useState(0);
    const [startingBoxes, setStartingBoxes] = useState(2);

    /**
     * Checks for when livesRemaining is changed. If there are 0 lives left, ends the game.
     */
    useEffect(()=> {
        if(livesRemaining <= 0) {
            setGameState(GameState.End);
        }
    },[livesRemaining]);

    /**
     * Graphical element: what the user sees when starting up the game for the first time.
     */
    const StartScreen = () => (
        <div className="startScreen">
            Press here to start the game.
            <br/><br/>
            {StartButton()}
        </div>
    );
    
    /**
     * Contains everything that's on screen while playing the game.
     */
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

            <br/><br/>
            {/* Calling this as a function and not an HTML component prevents weird rendering things. */}
            {EqTable(boxes)}

            <NumberButton/>

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
    
    /**
     * Graphical element: what the user sees after the game is over, allows user to replay the game.
     */
    const EndScreen = () => (
        <div className="endScreen">
            You ran out of lives! Try again!
            <br/><br/>
            Your score was: {difficulty}
            <br/><br/>
            {StartButton()}
        </div>
    );

    /**
     * Button to start the game: resets all variables to initial values.
     */
    const StartButton = () => (
        <button className="startButton" onClick={()=>{
            setBoxes(startingBoxes);
            setDifficulty(0);
            setLivesRemaining(3);
            setGameState(GameState.Play);
        }}>Begin Game</button>
    );

    const NumberButton = () => (
        <button onClick={()=>{
            setBoxes(boxes+1);
        }}>Add a box</button>
    );

    function EqTable(numBoxes:number) {
        let table = [];

        for(let i=0; i<2; i++) {
            let children = [];
            for(let j=0;j<2;j++) {
                if(i*2+j<numBoxes) {
                    children.push(<td className = "equationsCol">
                        <EquationDisplay
                        userInput={userInput}
                        setUserInput={setUserInput}
                        difficulty={difficulty}
                        setDifficulty={setDifficulty}
                        setLivesRemaining = {setLivesRemaining}
                        currAnswers = {currAnswers}
                        setCurrAnswers = {setCurrAnswers}
                        boxID={i*2+j}/>
                    </td>);
                } else {
                    children.push(<td className = "equationsCol"></td>);
                }
            }
            table.push(<tr>{children}</tr>);
        }
        return (
            <table className="equations">
                {table}
            </table>
        );
    }

    /**
     * Return statement: returns the screen for the current GameState.
     */
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