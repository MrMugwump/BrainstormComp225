export function ScoreDisplay({score}:any){
    function calcScore(score:number){
    }
    return(<>
        <div style={{
            border: `2px solid black`
        }}>
            <p>Score: {score}</p>
        </div>
    </>)
}