

export class Settings {
    numBoxes:number
    startingDifficulty:number
    startingLives:number
    timerSpeed:number
    isFreeplay:boolean

    constructor(numBoxes:number,startingDifficulty:number,startingLives:number,timerSpeed:number,isFreeplay:boolean) {
        this.numBoxes = numBoxes;
        this.startingDifficulty = startingDifficulty;
        this.startingLives = startingLives;
        this.timerSpeed = timerSpeed;
        this.isFreeplay = isFreeplay;
    }

    getNumBoxes() {
        return this.numBoxes;
    }

    getStartingDifficulty() {
        return this.startingDifficulty;
    }

    getStartingLives() {
        return this.startingLives;
    }

    getTimerSpeed() {
        return this.timerSpeed;
    }

    getIsFreeplay() {
        return this.isFreeplay;
    }
}