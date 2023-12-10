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
        setIsFreeplay(!isFreeplay);
    };

    const StartButton = () => (
        <button className="startButton" onClick={()=>{
            setSettings(new Settings(boxes,startingDifficulty,startingLives,timerSpeed,isFreeplay))
            setInitialize(true);
        }}>Start Game</button>
    );

    const IsFreeplayInput = () => (
        <div>
            <p>Freeplay mode:&nbsp;
            <input
                type="checkbox"
                checked={isFreeplay}
                onChange={changeIsFreeplay}
            />
            </p>
        </div>
    )

    const TimerSpeedInput = () => (
        <div>
            <p className={"active"+String(isFreeplay)}>Timer length:<br/>
            <input
                type="range"
                onChange={changeTimerSpeed}
                min={1}
                max={30}
                step={1}
                value={timerSpeed}
                disabled={!isFreeplay}
                className="TimerSpeedInput"
                id="TimerSpeedInput"
            />
            &nbsp;{timerSpeed}s</p>
        </div>
    )

    const BoxesInput = () => (
        <div>
            <p className={"active"+String(isFreeplay)}>Number of equations:<br/>
            <input
                type="range"
                onChange={changeBoxes}
                min={1}
                max={9}
                step={1}
                value={boxes}
                disabled={!isFreeplay}
                className="BoxesInput"
                id="BoxesInput"
            />
            &nbsp;{boxes}</p>
        </div>
    )

    const StartingLivesInput = () => (
        <div>
            <p className={"active"+String(isFreeplay)}>Number of lives:<br/>
            <input
                type="range"
                onChange={changeStartingLives}
                min={1}
                max={5}
                step={1}
                value={startingLives}
                disabled={!isFreeplay}
                className="StartingLivesInput"
                id="StartingLivesInput"
            />
            &nbsp;{startingLives}</p>
        </div>
    )

    const StartingDifficulty = () => (
        <div>
            <p className={"active"+String(isFreeplay)}>Difficulty:<br/>
            <input
                type="range"
                onChange={changeStartingDifficulty}
                min={0}
                max={200}
                step={1}
                value={startingDifficulty}
                disabled={!isFreeplay}
                className="StartingDifficulty"
                id="StartingDifficulty"
            />
            &nbsp;{startingDifficulty}</p>
        </div>
    )

    const DarkMode = () => (
        <div>
            <p>Dark Mode:&nbsp;
            <input
                type="checkbox"
            />
            </p>
        </div>
    )

    const PossibleOperators = () => (
        <div>

        </div>
    )

    return (
        <div>
            <StartButton/>
            <br/>
            <br/>
            <table className="settingsTable">
                <tbody>
                    <tr>
                        <td>
                            {DarkMode()}
                        </td>
                        <td>
                            {IsFreeplayInput()}
                            <br/>
                            {BoxesInput()}
                            <br/>
                            {StartingLivesInput()}
                            <br/>
                            {StartingDifficulty()}
                            <br/>
                            {TimerSpeedInput()}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
