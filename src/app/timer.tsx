import React from "react"
import { useState, useEffect } from 'react';
import "./timerStyle.css"

const ProgressBar = ({ progress, interval }:any) => ( 
  <div className="progressbar">
    <div className="progress" style={{ 
      height: `${progress}%`,
      transitionDuration: `${interval}ms`,
      }}>
    </div>
  </div>
)

const SECOND = 1_000; // 1000ms = 1s

/**
 * NOTE: pauses for one interval length upon instantiation, fix in future?
 * @param timerLength - length of the timer
 * @param interval - what chunk of time we want to decrement by
 * @param timeEnded - if set to true, TimerModule will reset the progress bar
 * 
 * @returns - returns the progress bar
 */
export default function TimerModule({timerLength, interval, timeEnded,actualSetTimeEnded}:any){
  const [timespan,setTimespan] = useState(timerLength);
  const [keyID,setKeyID] = useState(0); // used to reset the progress bar

  useEffect(()=>{
    const intervalId = setInterval(()=>{
      setTimespan((_timespan: number)=>{
        if(_timespan <= 0){
          actualSetTimeEnded(true);
          setKeyID((_keyID)=>_keyID+1); //resets the progress bar back to full
          return timerLength;
        }
        else{
          return _timespan - interval; //decrements timer by 1/10th of a second
        }
      });
    }, interval); // pauses for a tenth of a second

    return () => {clearInterval(intervalId)} // don't actually know what this does, prob parallel processing stuff
    
  },[interval]); //triggers every time setInterval is called

  useEffect(()=>{
    setKeyID((_keyID)=>_keyID+1); // resets the progress bar 
    setTimespan(() =>{
      return timerLength; // resets the time back to full
    });
  },[timeEnded]); // triggers every time timeEnded is changed

  return(
      <>
        <ProgressBar 
          key = {keyID}
          progress={10*timespan/SECOND}
          interval={interval}
          />
      </>
  );
}