export enum Operator {
    Addition="+",
    Subtraction="-",
    Multiplication="*",
    Division="÷"
}

/**
 * Randomly generates math problems based on difficulty. Used by equationDisplay to get random equations.
 */
export class Generator {
    firstNumber: number = 0;
    secondNumber: number = 0;
    operator: Operator = Operator.Addition;
    solution: number = 0;
    storedAnswers: number[] = [0,0,0,0];
    
    // Difficulty can be measured as the number of correct answers this far, starting at 0 by default
    // and would slowly increase as more correct answers are entered. The difficulty can start at a
    // higher (nonzero) number so the game starts out just that much harder than the default.
    constructor() {

    }

    // Based on the difficulty and operator, find the limit for the absolute value of operands
    // Visualization of limits: https://www.desmos.com/calculator/bqlg33m89x
    findLimit(diff: number, op: String) {
        // For addition and subtraction
        if(op === Operator.Addition || op === Operator.Subtraction) {
            if(diff <= Math.floor(100 * Math.PI)) {
                return Math.floor(495 * Math.sin(diff/100 - Math.PI/2) + 505);
            } else {
                return 1000;
            }
        }

        // For multiplication and division
        else /*if(op === Operators.Multiplication || op === Operators.Division)*/ {
            if(diff <= 110*Math.PI) {
                return Math.floor(48.5 * Math.sin(diff/110 - Math.PI/2) + 51.5);
            } else {
                return 100;
            }
        }
    }

    /**
     * Returns a random problem based on the input difficulty.
     */
    generateEquation(diff:number) {
        // New problems will be generated when the timer runs out
        this.operator = this.nextOperator(diff);
        
        // Evaluate in a different order for division (multiplication but rearranged)
        if(this.operator === Operator.Division) {
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

    genEquationWithLocation(diff:number,location:number){
        //rules for generating a number
        //  Can't generate an answer that contains a different answer at the beginning
        this.operator = this.nextOperator(diff);
        function checkIfContainsOtherAnswer(_answers:number[],_currAnswer:number, location:number){
            var strAnswer = _currAnswer.toString();
            for (let index = 0; index < _answers.length; index++) {
                if(index==location) continue;
                let strArrAnswer:string = _answers[index].toString();
                let lowestLength = (strAnswer.length<= strArrAnswer.length)? strAnswer.length : strArrAnswer.length;
                if(strAnswer.substring(0,lowestLength)==strArrAnswer.substring(0,lowestLength)){
                    return true;
                }
            }
            return false;
        }
        do{
            // Evaluate in a different order for division (multiplication but rearranged)
            if(this.operator === Operator.Division) {
                this.solution = this.nextOperand(diff);
                this.secondNumber = this.nextOperand(diff);
                this.firstNumber = this.nextSolution();
            } else {
                this.firstNumber = this.nextOperand(diff);
                this.secondNumber = this.nextOperand(diff);
                this.solution = this.nextSolution();
            }
        } while(checkIfContainsOtherAnswer(this.storedAnswers,this.solution,location));

        this.storedAnswers[location] = this.solution;
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
            return Operator.Addition;
        } else if(i === 2) {
            return Operator.Subtraction;
        } else if(i === 3) {
            return Operator.Multiplication;
        } else {
            return Operator.Division;
        }
    }

    // Random integer. Min and max are inclusive
    nextRandomInt(min:number, max:number) {
        return min + Math.floor(Math.random() * (max + 1 - min));
    }

    // Returns the solution of the equation, given operands and operator.
    nextSolution() {
        if(this.operator === Operator.Addition) {
            return this.firstNumber + this.secondNumber;
        } else if(this.operator === Operator.Subtraction) {
            return this.firstNumber - this.secondNumber;
        } else if(this.operator === Operator.Multiplication) {
            return this.firstNumber * this.secondNumber;
        } else if(this.operator === Operator.Division) {
            return this.solution * this.secondNumber;
        } else {
            return 0;
        }
    }
}