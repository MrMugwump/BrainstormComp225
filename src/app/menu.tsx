import { Settings } from "./settings";
import { useState, useEffect } from 'react';

export default function Menu({settings, setSettings, setInitialize}:any) {
    const [boxes, setBoxes] = useState(settings.getNumBoxes());
    const [startingDifficulty, setStartingDifficulty] = useState(settings.getStartingDifficulty());
    const [startingLives, setStartingLives] = useState(settings.getStartingLives());
    const [timerSpeed, setTimerSpeed] = useState(settings.getTimerSpeed()); //Number of seconds before timer reaches 0
    const [isFreeplay, setIsFreeplay] = useState(settings.getIsFreeplay());

    const changeBoxes = (event:any) => {
        setBoxes(event.target.value);
    };
    const changeStartingDifficulty = (event:any) => {
        setStartingDifficulty(event.target.value);
    };
    const changeStartingLives = (event:any) => {
        setStartingLives(event.target.value);
    };
    const changeTimerSpeed = (event:any) => {
        setTimerSpeed(event.target.value);
    };
    const changeIsFreeplay = (event:any) => {
        setIsFreeplay(event.target.value);
    };

    const StartButton = () => (
        <button className="startButton" onClick={()=>{
            setSettings(new Settings(boxes,startingDifficulty,startingLives,timerSpeed,isFreeplay))
            setInitialize(true);
        }}>Start Game</button>
    );

    const BoxesInput = () => (
        <div>
            <p>Number of boxes: </p>
            <input
                type="range"
                onChange={changeBoxes}
                min={1}
                max={9}
                step={1}
                value={boxes}
                className="NumBoxesInput"
                id="NumBoxesInput"
            />
            <p>{boxes}</p>
        </div>
    )

    const StartingLivesInput = () => (
        <div>
            <p>Number of lives: </p>
            <input
                type="range"
                onChange={changeStartingLives}
                min={1}
                max={5}
                step={1}
                value={startingLives}
                className="StartingLivesInput"
                id="StartingLivesInput"
            />
            <p>{startingLives}</p>
        </div>
    )

    const StartingDifficulty = () => (
        <div>
            <p>Difficulty: </p>
            <input
                type="range"
                onChange={changeStartingDifficulty}
                min={0}
                max={200}
                step={1}
                value={startingDifficulty}
                className="StartingDifficulty"
                id="StartingDifficulty"
            />
            <p>{startingDifficulty}</p>
        </div>
    )

    const DarkMode = () => (
        <div>
            <p>Dark Mode:</p>
            <input
                type="checkbox"
            />
        </div>
    )

    return (
        <div>
            <StartButton/>
            <br/>
            {BoxesInput()}
            <br/>
            {StartingLivesInput()}
            <br/>
            {StartingDifficulty()}
            <br/>
            {DarkMode()}
            <br/>
            <p>That feeling when you settings</p>
        </div>
    );
}
