import React from "react"
import { useState, useEffect } from 'react';
import "./timerStyle.css"
import { motion, useAnimation } from "framer-motion";

/**
 * The Progress Bar
 * 
 * All animations are now dynamically timed, 
 * so changes in timeLength needn't be worried about
 * 
 * @param timeLeft total time left in ms
 * @param timeLength total time of the timer in ms
 */
function ProgBar({timeLeft,timeLength}:any){
  const controls = useAnimation();
  const [animationFlag,setAnimationFlag] = useState(false);

  useEffect(()=>{
    if(timeLeft<0.33*timeLength){ //this is very silly but I haven't thought of an alternative
      setAnimationFlag(true);
    }
  },[timeLeft]);

  const variants = {
    shake: (animationLength: number) => ({
      rotateZ: [0, -1, 1,-1,1, -2, 2,-2,2,-2,2,-3, 3, -3,3,-3,3],
      transition: {duration: 1*animationLength, ease:'linear'}
    }),
    changeColorAndHeight: (timeLength:number) => ({
      backgroundColor:['hsl(115, 56%, 58%)','hsl(115, 56%, 58%)',	`hsl(0, 100%, 50%)`],
      height: ['100%','0%'],
      transition: {duration: timeLength, ease: 'linear'}
    }),
    //there is likely a way to get rid of this duplicated code, but I don't know how
    changeColor: (timeLength:number) => ({ 
      backgroundColor:['hsl(115, 56%, 58%)','hsl(115, 56%, 58%)',	`hsl(0, 100%, 50%)`],
      transition: {duration: timeLength, ease: 'linear'}
    })
  }
  useEffect(()=>{
    if(animationFlag){ //shakes the progress bar if the animation flag is set to true
      controls.start("shake");
    }
  },[animationFlag]);

  return(<>
    <motion.div
      custom={0.00032*timeLength}
      animate={controls}
      variants={variants}> 
      <div id="progressbar">
        <motion.div  id="progress" 
          custom={0.001*timeLength}
          animate="changeColorAndHeight"
          variants={variants}/>
        <motion.div id="dot"
          custom={0.001*timeLength}
          animate="changeColor"
          variants={variants}>
          <div id="border"></div> 
        </motion.div>
      </div>
    </motion.div>
    </>)
}

// Former progress bar, w/o animations
// const ProgressBar = ({ progress, interval }:any) => ( 
//   <>
//   <div id="progressbar">
//     <div id="progress" style={{ 
//       height: `${progress}%`,
//       width: `100%`,
//       transitionDuration: `${interval}ms`,
//       }}></div>
//     <div id="dot">
//       <div id="border"></div>
//     </div>
//   </div>
//   </>
// )

const SECOND = 1_000; // 1000ms = 1s

/**
 * NOTE: pauses for one interval length upon instantiation, fix in future?
 * @param timerLength - length of the timer
 * @param interval - what chunk of time we want to decrement by
 * @param timeEnded - if set to true, TimerModule will reset the progress bar
 * 
 * @returns - returns the progress bar
 */
export default function TimerModule({timerLength, interval, timeEnded,setTimeEnded}:any){
  const [timespan,setTimespan] = useState(timerLength);
  const [keyID,setKeyID] = useState(0); // used to reset the progress bar

  useEffect(()=>{
    const intervalId = setInterval(()=>{
      setTimespan((_timespan: number)=>{
        if(_timespan <= 0){
          setTimeEnded(true);
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
        <ProgBar key={keyID+1}
          timeLeft={timespan}
          timeLength={timerLength}/>
      </>
  );
}