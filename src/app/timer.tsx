import React from "react"
import { useState, useEffect } from 'react';
import "./timerStyle.css"

const ProgressBar = ({ progress }:any) => ( 
    <div className="progressbar">
      <div className="progress" style={{ width: `${progress}%`}}>
      </div>
    </div>
  )

const SECOND = 1_000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

export default function TimerModule({deadline, timerLength, interval, timeEnded}:any){
    var date = new Date(deadline);
    const [timespan,setTimespan] = useState(timerLength + date.getTime() - Date.now());
    useEffect(()=>{ // code adapted from https://dev.to/yuridevat/how-to-create-a-timer-with-react-7b9 
        const intervalId = setInterval(()=>{
            setTimespan((_timespan)=>{
                if(_timespan <= 0){
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
        setTimespan(timerLength);
    },[timeEnded]);

    return(
        <><p>{timespan/SECOND}</p></>
    );
}