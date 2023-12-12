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
import Menu from "./menu";
import { Settings } from "./settings";
import Logo from "./fullsize-logo.png"

enum GameState {
    Start = 0,
    Play = 1,
    End = 2,
}

/**
 * Handles the "gameplay" portion of the website. Handles the starting screen, gameplay screen, and end screen.
 */
export default function GameScene({dark,setDark}:any) {
    const [gameState, setGameState] = useState(GameState.Start);
    const [difficulty, setDifficulty] = useState(0);
    const [score,setScore] = useState(0);
    const [userInput, setUserInput] = useState(''); //represents what the user types into the answer box
    const [livesRemaining, setLivesRemaining] = useState(3);
    const [currAnswers, setCurrAnswers] = useState([0,0,0,0]);
    const [boxes, setBoxes] = useState(0);
    const [settings, setSettings] = useState(new Settings(2,0,3,10,false));
    const [initialize, setInitialize] = useState(false);
    const maxBoxes:number=4;

    /**
     * Checks for when livesRemaining is changed. If there are 0 lives left, ends the game.
     */
    useEffect(()=> {
        if(livesRemaining <= 0) {
            setGameState(GameState.End);
        }
    },[livesRemaining]);

    /**
     * Checks to see if the player has started the game in the menu, if so, starts the game.
     */
    useEffect(()=> {
        if(initialize===true) {
            //If the game is in freeplay mode, sets to the selected number of boxes.
            //If its in normal mode, there's one box at the start.
            if(settings.getIsFreeplay()) {
                setBoxes(settings.getNumBoxes());
                setDifficulty(settings.getStartingDifficulty());
                setLivesRemaining(settings.getStartingLives());
            } else { //regular mode
                setBoxes(1);
                setDifficulty(0);
                setLivesRemaining(3);
            }
            setScore(0);
            setInitialize(false);
            setGameState(GameState.Play);
        }
    },[initialize])

    /**
     * Checks when the score is increased, and if so adds a new box.
     * Only adds a box if the player is not in freeplay mode. Doesn't add a box when difficulty is zero because that's the start of the game.
     */
    useEffect(()=> {
        if(settings.getIsFreeplay()===false && boxes<maxBoxes && difficulty!=0) {
            setBoxes(boxes+1);
        }
    },[difficulty])

    /**
     * Graphical element: what the user sees when starting up the game for the first time.
     */
    const StartScreen = () => (
        <div className="startScreen">
            <img src={Logo.src} width="300" height="200"/>
            <Menu
            settings={settings}
            setSettings={setSettings}
            setInitialize={setInitialize}
            dark={dark}
            setDark={setDark}/>
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
                <ScoreDisplay score = {score}/>
            </div>

            <AnswerBox
            setUserInput={setUserInput}
            userInput={userInput}/>

            <br/><br/><br/>
            {/* Calling this as a function and not an HTML component prevents weird rendering things. */}
            {EqTable(boxes)}

            <LivesDisplay
            settings = {settings}
            livesRemaining = {livesRemaining}
            setLivesRemaining = {setLivesRemaining}/>
            
            <div style={{
                position: `fixed`,
                top: `90px`,
                right: `0`
            }}>
                <OperationDisplay difficulty={difficulty}/>
            </div>
            <div style={{
                position:`fixed`,
                top:'15px',
                left:'15px',
            }}>
                <ExitButton/>
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
            Your score was: {difficulty-settings.getStartingDifficulty()}
            <br/><br/>
            {RestartButton()}
            <br/><br/>
            {SettingsButton()}
        </div>
    );

    /**
     * Button to end the current game, going back to the main menu
     */
    const ExitButton = () => (
        <button className="exitButton" onClick={()=>{
            setGameState(GameState.Start);
        }}>Exit</button>
    )

    /**
     * Button to restart the game with the same settings.
     */
    const RestartButton = () => (
        <button className="restartButton" onClick={()=>{
            setInitialize(true);
        }}>Play Again</button>
    );

    /**
     * Button to go back to the settings page.
     */
    const SettingsButton = () => (
        <button className="settingsButton" onClick={()=>{
            setGameState(GameState.Start);
        }}>Change Settings</button>
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
                        score={score}
                        setScore={setScore}
                        setLivesRemaining = {setLivesRemaining}
                        currAnswers = {currAnswers}
                        setCurrAnswers = {setCurrAnswers}
                        settings = {settings}
                        dark={dark}
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