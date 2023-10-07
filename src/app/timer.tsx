import React from "react"
import { useState, useEffect } from 'react';
import "./timerStyle.css"

const ProgressBar = ({ progress, interval }:any) => ( 
  <div className="progressbar">
    <div className="progress" style={{ 
      width: `${progress}%`,
      transitionDuration: `${interval}ms`,
      }}>
    </div>
  </div>
)

const SECOND = 1_000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

export default function TimerModule({timerLength, interval, timeEnded}:any){
  const [timespan,setTimespan] = useState(timerLength);
  const [keyID,setKeyID] = useState(0);
  useEffect(()=>{
    const intervalId = setInterval(()=>{
        setTimespan((_timespan: number)=>{
            if(_timespan <= 0){
              setKeyID((_keyID)=>_keyID+1);
              return timerLength;
            }
            else{
              return _timespan - interval*0.1;
            }
        });
    }, interval*0.1);

    return () => {clearInterval(intervalId)}
    
  },[interval]);

  useEffect(()=>{
      setTimespan(() =>{
        setKeyID((_keyID)=>_keyID+1); // pretty sure I have this here, haven't tested tho lmao
        return timerLength;
      });
      
      // return ()=>setTimespan(-21);
  },[timeEnded]);

  return(
      <>
        <p>{timespan/SECOND}</p>
        <hr/>
        <ProgressBar 
          key = {keyID}
          progress={10*timespan/SECOND}
          interval={interval}
          />
      </>
  );
}