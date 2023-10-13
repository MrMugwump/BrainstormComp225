'use client';

import Image from 'next/image'
import React from 'react';
import { useState } from 'react';
import TimerModule from './timer';
import EquationDisplay from './equationDisplay';
import SettingsModule from './settings';




export default function Home() {

  const [deadline, setDeadline] = useState(new Date());
  const [timerLength, setTimerLength] = useState(10000);
  const [interval, setInterval] = useState(1000);
  const [timeEnded, setTimeEnded] = useState(1);
  const [isActive, setActive] = useState(false);
  const [difficulty, setDifficulty] = useState(0);
  //const {seconds} = useTimer(time,10000);

  return (
    <html>
      <head><title> Brainstorm by Herb Jury {/*Metadata title for the webpage:*/}</title></head>

      <body> {/*All elements of the webpage follow:*/}

          {/*Header:*/}
          <table className="headerMenu">
          <tbody>
            <tr>
              <td className="menuLeftBox">
                <a href='https://docs.google.com/document/d/1AptnwPwv4SSi0qF9lezG9_6FiOP8LKhDsg6TUamVKog/edit?usp=sharing'>Project Info</a>
              </td>
              <td className="menuCenterBox">
                <h3><i>Brainstorm</i> by Herb Jury</h3>
              </td>
              <td className="menuRightBox">
              <a href='https://google.com/'>Settings</a>
              </td>
            </tr>
          </tbody>
        </table>

        <div className="content">

        <p>Difficulty display:</p>
        <br></br>
        <SettingsModule
        isActive = {isActive}
        difficulty = {difficulty}/>
        <button className='button button2' onClick={()=>setDifficulty(1)}>change difficulty</button>
        <button className='button button3' onClick={
          ()=>setActive(true)
        }>toggle menu</button>


        <p>Equation display:</p>
        <br></br>
        <EquationDisplay></EquationDisplay>

        <p>Timer module:</p>
        <br></br>
        <TimerModule 
        deadline = {deadline}
        timerLength={timerLength}
        interval={interval}
        timeEnded={timeEnded}/>
        <button className='button button1' onClick={()=>setTimeEnded((_timeEnded)=>-1*_timeEnded)}>skdjfhsdk + {timeEnded}</button>

        </div> {/*End of non-header/footer content.*/}
      </body>
    </html>
      )
}