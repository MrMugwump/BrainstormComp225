import { Settings } from "./settings";

export default function Menu({settings, setSettings, setInitialize}:any) {
    var numBoxes:number = settings.getNumBoxes();
    var startingDifficulty:number = settings.getStartingDifficulty();
    var startingLives:number = settings.getStartingLives();
    var isFreeplay:boolean = settings.getIsFreeplay();



    const StartButton = () => (
        <button className="startButton" onClick={()=>{
            setSettings(new Settings(numBoxes,startingDifficulty,startingLives,isFreeplay))
            setInitialize(true);
        }}>Begin Game</button>
    );

    return (<>
        <p>
            <StartButton/>
            <br/>
            This is the menu.
        </p>
    </>);
}
