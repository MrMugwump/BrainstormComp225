import { useEffect, useState } from "react"

export function OperationDisplay({difficulty}:any){
    const [operatorIsLocked, setIsLocked] = useState([true,false,false,false]);
    function updateArray(_operators:boolean[],index:number){ //definitely a simpler way to do this
        _operators[index] = true;
        return _operators;
    }

    useEffect(()=>{
        if(difficulty < 5){
            setIsLocked((_operators)=>updateArray(_operators,0));
        }
        else if(difficulty < 15){ //subtraction
            setIsLocked((_operators)=>updateArray(_operators,1));
        } else if (difficulty < 20) { //multiplication
            setIsLocked((_operators)=>updateArray(_operators,2));
        } else{ //division
            setIsLocked((_operators)=>updateArray(_operators,3));
        }
    },[difficulty]);


    return(<>
        <table>
            <tbody>
                <tr>
                    <td>Addition :</td>
                    <td><LockIndicator isLocked={operatorIsLocked[0]}/></td>
                    <td>Subtraction :</td>
                    <td><LockIndicator isLocked={operatorIsLocked[1]}/></td>
                    <td>{operatorIsLocked.toString()}</td>
                    <td>{difficulty}</td>
                </tr>
            </tbody>
        </table>
    </>)
}

function LockIndicator({isLocked}:any){
    function changeColor(isTrue:boolean){
        if(isTrue){
            return '#008000' //green
        } else{
            return '#ff0000' //red
        }
    }

    return(<>
        <div style={{
            border: `10px solid ${changeColor(isLocked)}`,
            borderRadius: `50%`
        }}></div>
    </>)
}