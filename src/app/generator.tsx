enum Operators {
    Addition="+",
    Subtraction="-",
    Multiplication="*",
    Division="÷"
}

export class Generator {
    firstNumber: number = 0;
    secondNumber: number = 0;
    operator: Operators = Operators.Addition;
    solution: number = 0;
    
    // Difficulty can be measured as the number of correct answers this far, starting at 0 by default
    // and would slowly increase as more correct answers are entered. The difficulty can start at a
    // higher (nonzero) number so the game starts out just that much harder than the default.
    constructor() {

    }

    // Based on the difficulty and operator, find the limit for the absolute value of operands
    // Visualization of limits: https://www.desmos.com/calculator/ikzfjyj5de
    findLimit(diff: number, op: String) {
        // For addition and subtraction
        if(op === Operators.Addition || op === Operators.Subtraction) {
            if(diff <= 50) {
                return Math.floor(80 * Math.sin(diff/29.5 - (25*Math.PI)/2) + 90);
            } else if(diff <= 1000) {
                return 18 * diff - 800;
            } else {
                return 1000;
            }
        }

        // For multiplication and division
        else /*if(op === Operators.Multiplication || op === Operators.Division)*/ {
            if(diff <= 75*Math.PI) {
                return Math.floor(45 * Math.sin(diff/75.0 - Math.PI/2) + 55);
            } else {
                return 100;
            }
        }
    }

    /**
     * Returns a random problem based on the input difficulty.
     */
    generateProblem(diff:number) {
        // New problems will be generated when the timer runs out
        this.operator = this.nextOperator(diff);
        
        // Evaluate in a different order for division (multiplication but rearranged)
        if(this.operator === Operators.Division) {
            this.solution = this.nextOperand(diff);
            this.secondNumber = this.nextOperand(diff);
            this.firstNumber = this.nextSolution();
        } else {
            this.firstNumber = this.nextOperand(diff);
            this.secondNumber = this.nextOperand(diff);
            this.solution = this.nextSolution();
        }

        return [this.firstNumber, this.operator, this.secondNumber, this.solution]
    }

    // Returns one of the numbers to be used in the equation
    nextOperand(diff:number) {
        var output = 0;
        while(output === 0) {
            var x = this.nextRandomInt(1, this.findLimit(diff, this.operator));

            output = Math.abs(x);
        }

        return output;
    }

    // Returns the operator to be used in the equation
    nextOperator(diff:number) {
        var i: number = 0;
        if(diff < 5) {
            i = 1;
        } else if(diff < 15) {
            i = 1 + Math.floor(Math.random() * 2);
        } else if(diff < 20) {
            i = 1 + Math.floor(Math.random() * 3);
        } else {
            i = 1 + Math.floor(Math.random() * 4);
        }

        return this.nextOperatorByNumber(i);
    }

    nextOperatorByNumber(i: number) {
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

    // Random integer. Min and max are inclusive
    nextRandomInt(min:number, max:number) {
        return min + Math.floor(Math.random() * (max + 1 - min));
    }

    // Returns the solution of the equation, given operands and operator.
    nextSolution() {
        if(this.operator === Operators.Addition) {
            return this.firstNumber + this.secondNumber;
        } else if(this.operator === Operators.Subtraction) {
            return this.firstNumber - this.secondNumber;
        } else if(this.operator === Operators.Multiplication) {
            return this.firstNumber * this.secondNumber;
        } else if(this.operator === Operators.Division) {
            return this.solution * this.secondNumber;
        } else {
            return 0;
        }
    }
}