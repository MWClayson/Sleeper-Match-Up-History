function MatchUp({score, middle}){

    if(middle){
        return(
            <>
            </>
        )
    }
    return (
        <>
        <div>
            {score.team1Count} - {score.team2Count}
        </div>
        </>
    )

}
export default MatchUp