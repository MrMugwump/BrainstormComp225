'use client';

import Image from 'next/image'
import React from 'react';
import { useState } from 'react';

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

  return (
      equation
  );
}


export default function Home() {
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
      </body>
    </html>
      )
}