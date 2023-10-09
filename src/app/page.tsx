'use client';

import Image from 'next/image'
import React from 'react';
import { useState } from 'react';
import TimerModule from './timer';
import EquationDisplay from './equationDisplay';



export default function Home() {

  const [deadline, setDeadline] = useState(new Date());
  const [timerLength, setTimerLength] = useState(10000);
  const [interval, setInterval] = useState(1000);
  const [timeEnded, setTimeEnded] = useState(1);
  //const {seconds} = useTimer(time,10000);

  return (
    <html>
      <head><title> Brainstorm Game {/*Metadata title for the webpage:*/}</title></head>

      <body> {/*All elements of the webpage follow:*/}

        <header>
          <i>Brainstorm</i> by Herb Jury
        </header>

        <div className="content">

        <h1>
          Brainstorm Game
        </h1>
        <p>Equation display:</p>
        <br></br>
        <EquationDisplay></EquationDisplay>

        <hr/>
        <TimerModule 
        deadline = {deadline}
        timerLength={timerLength}
        interval={interval}
        timeEnded={timeEnded}/>
        <hr/>
        <button className='button button1' onClick={()=>setTimeEnded((_timeEnded)=>-1*_timeEnded)}>skdjfhsdk + {timeEnded}</button>

        </div> {/*End of content.*/}
      </body>
    </html>
      )
}