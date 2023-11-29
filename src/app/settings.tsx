

export class Settings {
    numBoxes:number
    startingDifficulty:number
    startingLives:number
    isFreeplay:boolean

    constructor(numBoxes:number,startingDifficulty:number,startingLives:number,isFreeplay:boolean) {
        this.numBoxes = numBoxes;
        this.startingDifficulty = startingDifficulty;
        this.startingLives = startingLives;
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

    getIsFreeplay() {
        return this.isFreeplay;
    }
}