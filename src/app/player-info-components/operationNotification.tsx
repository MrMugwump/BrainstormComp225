import { useEffect, useState } from "react"

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
        <table>
            <tbody>
                <td style={{textAlign:`right`}}>
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
                    {/* <td>{operatorIsLocked.toString()}</td> */}
                    {/* <td>{difficulty}</td> */}
                </td>
            </tbody>
        </table>
    </>)
}

function LockIndicator({isLocked}:any){
    function changeColor(isTrue:boolean){
        if(isTrue){
            return '#60d056' //green
        } else{
            return '#ff0000' //red
        }
    }

    return(<>
        <div style={{
            width:`1em`,
            height:`1em`,
            backgroundColor: `${changeColor(isLocked)}`,
            border: `0.1em solid black`,
            borderRadius: `50%`
        }}></div>
    </>)
}