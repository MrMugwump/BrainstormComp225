'use client';

import Image from 'next/image'
import React from 'react';
import { useState } from 'react';
import TimerModule from './timer';

function MathProblem() {
  enum Symbol {
    Plus="+",
    Minus="-",
    Multiply="*",
  }

  var symbolNum: Number = Math.floor(Math.random()*3)
  var symbol: Symbol
  if(symbolNum===0) {
    symbol=Symbol.Plus
  } else if(symbolNum===1) {
    symbol=Symbol.Minus
  } else {
    symbol=Symbol.Multiply
  }
  var numFirst: Number = Math.floor(Math.random()*20)
  var numSecond: Number = Math.floor(Math.random()*20)
  var equation: String = numFirst.toString() +" "+ symbol.toString() +" "+ numSecond.toString()

  var solution: Number
  if(symbol===Symbol.Plus) {
    solution=+numFirst + +numSecond
  } else if(symbol===Symbol.Minus) {
    solution=+numFirst - +numSecond
  } else {
    solution=+numFirst * +numSecond
  }

  var output: String
  output = "Question: "+equation+" Solution: "+solution

  return (
  output  
);
}


export default function Home() {

  const [deadline, setDeadline] = useState(new Date());
  const [timerLength, setTimerLength] = useState(10000);
  const [interval, setInterval] = useState(1000);
  const [timeEnded, setTimeEnded] = useState(1);
  //const {seconds} = useTimer(time,10000);
  return (

    <html>
      <body>
        <h1>
          Brainstorm Game
        </h1>
          <form action="subpage.tsx">
            <label htmlFor="fname">Answer: </label>
            <input type="text" id="fname" name="fname"></input>
            <br></br><br></br>
            <input type="submit" value="Submit"></input>
          </form>
        <br></br>
        <MathProblem></MathProblem>
        <hr/>
        <TimerModule 
        deadline = {deadline}
        timerLength={timerLength}
        interval={interval}
        timeEnded={timeEnded}/>
        <hr/>
        <button className='button button1' onClick={()=>setTimeEnded((_timeEnded)=>-1*_timeEnded)}>skdjfhsdk + {timeEnded}</button>
      </body>
    </html>
      )
}