enum Operators {
    Addition="+",
    Subtraction="-",
    Multiplication="*",
    Division="÷"
}

export class Generator {
    difficulty: number = 0;
    firstNumber: number = 0;
    secondNumber: number = 0;
    operator: Operators = Operators.Addition;
    solution: number = 0;
    
    // Difficulty can be measured as the number of correct answers this far, starting at 0 by default
    // and would slowly increase as more correct answers are entered. The difficulty can start at a
    // higher (nonzero) number so the game starts out just that much harder than the default.
    constructor(diff: number) {
        this.difficulty = diff;
        if(diff < 0) {
            this.difficulty = 0;
        }
    }

    // Based on the difficulty and operator, find the limit for the absolute value of operands
    // Visualization of limits: https://www.desmos.com/calculator/31neiprxux
    findLimit(diff: number, op: String) {
        // For addition and subtraction
        if(op === Operators.Addition || op === Operators.Subtraction) {
            if(diff <= 50) {
                return Math.floor(80 * Math.sin(diff/29.5 - 25*Math.PI/2) + 90);
            } else if(diff <= 1000) {
                return 18 * diff - 800;
            } else {
                return 1000;
            }
        }

        // For multiplication and division
        else if(op === Operators.Multiplication || op === Operators.Division) {
            if(diff <= 75*Math.PI) {
                return Math.floor(75 * Math.sin(diff/75.0 - Math.PI/2) + 55);
            } else {
                return 100;
            }
        }

        else { //More operators to be added later, dummy return statement for now so it doesn't get mad at me
            return 0;
        }
    }

    generateProblem() {
        // FOR LATER: Only increase difficulty when a problem is solved, not when a new problem is generated.
        // As new problems will be generated when the timer runs out
        this.difficulty = this.difficulty + 1;
        this.getFirstNumber();
        this.getOperator();
        this.getSecondNumber();
        return [this.firstNumber, this.operator, this.secondNumber, this.solution]
    }

    getFirstNumber() {
        this.firstNumber = this.randomInt(1, this.findLimit(this.difficulty, this.operator));
        // 50% chance to return a negative number instead of a positive number
        if(this.randomInt(1, 2) === 2) {
            this.firstNumber = this.firstNumber * -1;
        }
    }

    getSecondNumber() {
        // If division problem, come up with a list of even divisors of the first number and choose from there.
        if(this.operator === Operators.Division) {
            let divisors: Array<Number> = [];
            for(let i = 1; i <= this.firstNumber / 2; i++) {
                if(this.firstNumber % i === 0) {
                    divisors.push(i);
                }
            }
            // Choose a random even divisor
            return divisors[this.randomInt(0, divisors.length)];
        }

        // For other operations, proceed as normal.
        else {
            this.firstNumber = this.randomInt(1, this.findLimit(this.difficulty, this.operator));
            if(this.randomInt(1, 2) === 2) {
                this.firstNumber = this.firstNumber * -1;
            }
        }
    }

    getOperator() {
        var i: number = 0;
        if(this.difficulty < 5) {
            i = 1;
        } else if(this.difficulty < 15) {
            i = 1 + Math.floor(Math.random() * 2);
        } else if(this.difficulty < 20) {
            i = 1 + Math.floor(Math.random() * 3);
        } else {
            i = 1 + Math.floor(Math.random() * 4);
        }

        this.operator = this.getOperatorByNumber(i);
        return this.getOperatorByNumber(i);
    }

    getOperatorByNumber(i: number) {
        if(i === 1) {
            return Operators.Addition;
        } else if(i === 2) {
            return Operators.Subtraction;
        } else if(i === 3) {
            return Operators.Multiplication;
        } else {
            return Operators.Division;
        }
    }

    // Min and max are inclusive
    randomInt(min:number, max:number) {
        return min + Math.floor(Math.random() * (max + 1 - min));
    }

    getSolution() {
        if(this.operator === Operators.Addition) {
            return this.firstNumber + this.secondNumber;
        } else if(this.operator === Operators.Subtraction) {
            return this.firstNumber - this.secondNumber;
        } else if(this.operator === Operators.Multiplication) {
            return this.firstNumber * this.secondNumber;
        } else {
            return this.firstNumber / this.secondNumber;
        }
    }
}