import React from "react"
import { useState, useEffect } from 'react';
import "./timerStyle.css"
import { easeIn, motion, useAnimation } from "framer-motion";
import "styled-jsx/css"
import css from "styled-jsx/css";

function getStyles(){
  return css.resolve`
    .main-bar {
      width: 20px;
      height: 200px;
      background-color: #c3ffbe;
      border: 3px solid black;
      border-radius: 10px;
      position: relative;
      top: -10px;

    }

    .progress-bar {
      border-radius: 7px;
      height: 100%;
      text-align: right;
      padding: 0 10px;
      bottom: 0;
      position: absolute;
      /* transition: height linear;
      transition-duration: 1ms; */
      transform: rotate(180deg);
      line-height: 22px; /* same as #progressBar height if we want text middle aligned */
      background-color: #60d056;
      box-sizing: border-box;
    }

    .dot {
      height: 15%;
      width: 150%; /*30px*/
      border-radius: 50%;
      display: table;
      /*this should be centered*/
      position: absolute;
      bottom: -10%;
      left: -25%;
    }

    .border{
      z-index: -1;
      background-color: black;
      height: 117%;
      width: 117%;
      // height: 16.5%;
      // width: 165%;
      border-radius: 50%;
      display: table;
      position: relative;
      transform: translate(-2.5px,-2.5px); /*10px*/
    }
  `
}

function ProgBar({ progress, timeLength }:any){
  const controls = useAnimation();
  const [testVar,setTestVar] = useState(false);
  const {className,styles} = getStyles();
  const [timeLeft,setTimeLeft] = useState(progress-timeLength);

  const variants = {
    shakeBar: (_timeLeft:number) => ({
        rotateZ: [0, -1, 1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1, -2, 2,-2,2,-2,2,-3, 3, -3,3,-3,3],
        transition: {duration: _timeLeft, ease:'linear'}
    })
  }

  useEffect(()=>{
    if(progress<0.33*timeLength){
      setTestVar(true);
    }
  },[progress]);
  useEffect(()=>{
    if(testVar)
    {
      controls.start(()=>({
        rotateZ: [0, -1, 1,-1,1, -2, 2,-2,2,-2,2,-3, 3, -4,4,-5,5,0],
        transition: {duration: 3.2, ease:'linear'}
      }));
    }
  },[testVar]);

  return(<>
      <motion.div className="parentBox"
        animate={controls}>
      <div className={`${className} main-bar`}>
        <motion.div id="progress" style={{ 
          }}
          animate={{backgroundColor:['hsl(115, 56%, 58%)','hsl(115, 56%, 58%)',	`hsl(0, 100%, 50%)`],
          height:['100%','0%'],
          }}
          transition={{ease:"linear", duration:'10'}}></motion.div>
        <motion.div id="dot"
          animate={{backgroundColor:['hsl(115, 56%, 58%)','hsl(115, 56%, 58%)',	`hsl(0, 100%, 50%)`]}}
          transition={{ease:"linear",duration:'10'}}>
          <div id="border"></div> 
        </motion.div>
      {styles}
    </div>
    </motion.div>
  </>);
}


const ProgressBar = ({ progress, interval }:any) => ( 
  <>
  <div id="progressbar">
    <motion.div id="progress" style={{ 
      }}
      animate={{backgroundColor:['hsl(115, 56%, 58%)','hsl(115, 56%, 58%)',	`hsl(0, 100%, 50%)`],
      height:['100%','0%'],
      }}
      transition={{ease:"linear", duration:'10'}}></motion.div>
    <motion.div id="dot"
      animate={{backgroundColor:['hsl(115, 56%, 58%)','hsl(115, 56%, 58%)',	`hsl(0, 100%, 50%)`]}}
      transition={{ease:"linear",duration:'10'}}>
      <div id="border"></div>
    </motion.div>
  </div>
  </>
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
        if(_timespan <= 300){
          actualSetTimeEnded(true);
          setKeyID((_keyID)=>_keyID+1); //resets the progress bar back to full
          return timerLength;
        }
        else{
          return _timespan-interval; //decrements timer by 1/10th of a second
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
        <ProgBar key={keyID}
          progress={10*timespan}
          timeLength={10*timerLength}/>
      </>
  );
}