import React from "react"
import { useState, useEffect } from 'react';

enum Operators {
    Addition="+",
    Subtraction="-",
    Multiplication="*",
    Division="÷"
}

// Based on the difficulty and operator, find the limit for the absolute value of operands
// https://www.desmos.com/calculator/ohlsasizwh
function limit(diff: number, op: String) {
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
    if(op === Operators.Multiplication || op === Operators.Division) {
        if(diff <= 75*Math.PI) {
            return Math.floor(75 * Math.sin(diff/75.0 - Math.PI/2) + 55);
        } else {
            return 100;
        }
    }
}

class Generator {
    difficulty: number = 0;
    firstNumber: number = 0;
    secondNumber: number = 0;
    operator: String = "";
    solution: number = 0;
    
    // Difficulty can be measured as the number of correct answers this far, starting at 0 by default
    // and would slowly increase as more correct answers are entered. The difficulty can start at a
    // higher (nonzero) number so the game starts out just that much harder than the default.
    constructor(diff: number) {
        this.difficulty = diff;
    }

    generateProblem() {
        return [this.firstNumber, this.operator, this.secondNumber, this.solution]
    }

    // PRIVATE PROPERTY!
    getFirstNumber() {

    }

    getSecondNumber() {

    }

    getOperator() {
        
    }

    getSolution() {

    }
}