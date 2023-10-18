'use client';

import Image from 'next/image'
import React from 'react';
import { useState } from 'react';
// import { Link } from 'react-router-dom';
import TimerModule from './timer';
import EquationDisplay from './equationDisplay';
import SettingsModule from './settings';
import GameScene from './gameScene';



export default function Home() {

  const [deadline, setDeadline] = useState(new Date());
  const [timerLength, setTimerLength] = useState(10000);
  const [interval, setInterval] = useState(1000);
  const [timeEnded, setTimeEnded] = useState(1);
  const [isActive, setActive] = useState(false);
  const [difficultySetting, setDifficultySetting] = useState(0);
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
              <a href='#' onClick={ ()=>setActive(!isActive) }>Settings</a>
              </td>
            </tr>
          </tbody>
        </table>

        <div className="content">

        {/* SettingsModule handles the settings sidebar. */}
        <SettingsModule
        isActive={isActive}
        difficultySetting={difficultySetting}/>

        {/* GameScene handles all of the processes of the actual gameplay. This is where the EquationDisplay is displayed. */}
        <GameScene/>


        </div> {/*End of non-header/footer content.*/}
      </body>
    </html>
      )
}