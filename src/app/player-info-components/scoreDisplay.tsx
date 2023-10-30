export function ScoreDisplay({difficulty}:any){
    function calcScore(difficulty:number){
    }
    return(<>
        <div style={{
            border: `2px solid black`
        }}>
            <p>Score: {difficulty}</p>
        </div>
    </>)
}