import { Settings } from "./settings";

export default function Menu({settings, setSettings, setInitialize}:any) {
    var numBoxes:number = settings.getNumBoxes();
    var startingDifficulty:number = settings.getStartingDifficulty();
    var startingLives:number = settings.getStartingLives();
    var timerSpeed:number = settings.getTimerSpeed(); //Number of seconds before timer reaches 0
    var isFreeplay:boolean = settings.getIsFreeplay();

    const StartButton = () => (
        <button className="startButton" onClick={()=>{
            setSettings(new Settings(numBoxes,startingDifficulty,startingLives,timerSpeed,isFreeplay))
            setInitialize(true);
        }}>Start Game</button>
    );

    return (<>
        <p>
            <StartButton/>
            <br/>
            This is the menu.
        </p>
    </>);
}
