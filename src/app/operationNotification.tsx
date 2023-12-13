import React from "react";
import { useEffect, useState } from "react";
import fullPlus from './symbol-images/plus_filled.png';
import emptyPlus from './symbol-images/plus_empty.png';
import fullMinus from './symbol-images/minus_filled.png';
import emptyMinus from './symbol-images/minus_empty.png';
import fullMultiply from './symbol-images/multiply_filled.png';
import emptyMultiply from './symbol-images/multiply_empty.png';
import fullDivide from './symbol-images/divide_filled.png';
import emptyDivide from './symbol-images/divide_empty.png';

/*
 * Graphical element that shows which operation types could possibly be generated, based on difficulty.
 */
export function OperationDisplay({difficulty}:any){
    const [operatorIsLocked, setIsLocked] = useState([true,false,false,false]);
    function updateArray(_operators:boolean[],index:number){ //definitely a simpler way to do this
        _operators[index] = true;
        return _operators;
    }

    useEffect(()=>{
        if(difficulty == 1){
            setIsLocked((_operators)=>updateArray(_operators,0));
        }
        else if(difficulty == 5){ //subtraction
            setIsLocked((_operators)=>updateArray(_operators,1));
        } else if (difficulty == 15) { //multiplication
            setIsLocked((_operators)=>updateArray(_operators,2));
        } else if (difficulty == 20) { //division
            setIsLocked((_operators)=>updateArray(_operators,3));
        }
    },[difficulty]);

    return(<>
        <table className="operationDisplay">
            <tbody>
                {/* Commented: Previous table format in case we want to switch back */}
                {/* <td style={{textAlign:`right`}}>
                    <tr><p>Addition :</p>
                    <td><LockIndicator isLocked={operatorIsLocked[0]}/></td>
                    </tr>
                    <tr><p>Subtraction :</p>
                    <td><LockIndicator isLocked={operatorIsLocked[1]}/></td>
                    </tr>
                    <tr><p>Multiplication :</p>
                    <td><LockIndicator isLocked={operatorIsLocked[2]}/></td>
                    </tr>
                    <tr><p>Division :</p>
                    <td><LockIndicator isLocked={operatorIsLocked[3]}/></td>
                    </tr>
                </td> */}

                <td style={{textAlign:`center`,fontSize:`30pt`}}>
                    <tr>
                        <td><LockIndicator isLocked={operatorIsLocked[0]} symbol={"plus"}/></td>
                        <td><LockIndicator isLocked={operatorIsLocked[1]} symbol={"minus"}/></td>
                        <td><LockIndicator isLocked={operatorIsLocked[2]} symbol={"multiply"}/></td>
                        <td><LockIndicator isLocked={operatorIsLocked[3]} symbol={"divide"}/></td>
                    </tr>
                </td>
            </tbody>
        </table>
    </>)
}

function LockIndicator({isLocked,symbol}:any){
        if(isLocked){
            if(symbol==="plus") {
                return (<img src={fullPlus.src} width="70px" height="70px"/>)
            } else if(symbol=="minus") {
                return (<img src={fullMinus.src} width="70px" height="30px"/>)
            } else if(symbol=="multiply") {
                return (<img src={fullMultiply.src} width="70px" height="70px"/>)
            } else {
                return (<img src={fullDivide.src} width="70px" height="70px"/>)
            }
        } else{
            if(symbol==="plus") {
                return (<img src={emptyPlus.src} width="70px" height="70px"/>)
            } else if(symbol=="minus") {
                return (<img src={emptyMinus.src} width="70px" height="30px"/>)
            } else if(symbol=="multiply") {
                return (<img src={emptyMultiply.src} width="70px" height="70px"/>)
            } else {
                return (<img src={emptyDivide.src} width="70px" height="70px"/>)
            }
        }
}