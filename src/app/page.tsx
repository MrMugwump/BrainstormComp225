'use client';

import Image from 'next/image'
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
// import { Link } from 'react-router-dom';
import TimerModule from './timer';
import EquationDisplay from './equationDisplay';
import GameScene from './gameScene';
import './gameSceneStyle.css';



export default function Home() {

  const [deadline, setDeadline] = useState(new Date());
  const [timerLength, setTimerLength] = useState(10000);
  const [interval, setInterval] = useState(1000);
  const [isActive, setActive] = useState(false);
  const [difficultySetting, setDifficultySetting] = useState(0);
  const [dark, setDark] = useState(false);
  const [monospace, setMonospace] = useState(true);
  //const {seconds} = useTimer(time,10000);

  return (
    <html className={"dark"+String(dark)+" "+"monospace"+String(monospace)}>
      <head><title> Brainstorm by Herb Jury {/*Metadata title for the webpage:*/}</title></head>

      <body> {/*All elements of the webpage follow:*/}

        <div className="content">

        {/* GameScene handles all of the processes of the actual gameplay. This is where the EquationDisplay is displayed. */}
        <div style={{
          position:`relative`,
          top: `-1em`
        }}> 
        <GameScene dark={dark} setDark={setDark} monospace={monospace} setMonospace={setMonospace}/>
        </div>


        </div> {/*End of non-header/footer content.*/}
      </body>
    </html>
      )
}