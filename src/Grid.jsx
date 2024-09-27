import { useState, useEffect } from 'react'
import { getLeague, getRosters } from './API.js';
import Player from './Player.jsx'
import { matchUpBuilder } from './MatchUpBuilder.js';
import MatchUp from './MatchUp.jsx';

function Grid({ leagues }) {
    const [loading, setLoading] = useState(true);
    const [players, setPlayers] = useState([])
    const [matchUps, setMatchUps] = useState([])



    useEffect(()=>{
        setLoading(true)
        for (const leagueId of leagues ){
            const playerList = [];
            getRosters(leagueId)
                .then(result =>{ 
                    result.forEach(x => {
                        playerList.push(x.owner_id)
                    })
                    setPlayers(players.concat(playerList))    
                })
        }
        matchUpBuilder(leagues).then(result => {
            setMatchUps(result); 
            console.log(matchUps);
            setLoading(false)
        });
        
        
    },[leagues])


    function matchUpCalculator(teamOne, teamTwo){
        let team1Count = 0;
        let team2Count = 0;
        

        for(const result of matchUps.filter(mu => mu.team1 == teamOne && mu.team2 == teamTwo)){
            if(result.team1Score > result.team2Score){
                team1Count=team1Count+1;
            }
            else if(result.team1Score < result.team2Score){
                team2Count=team2Count+1;
            }
        }
        for(const result of matchUps.filter(mu => mu.team2 == teamOne && mu.team1 == teamTwo  )){
            if(result.team1Score > result.team2Score){
                team2Count=team2Count+1;
            }
            else if(result.team1Score < result.team2Score){
                team1Count=team1Count+1;
            }
        }
        return {team1Count, team2Count}
    }

    function getCleanPlayers(){
        const playersCleaned = players.filter(function (el) {
            return el != null && el != "";
          });
        return [...new Set(playersCleaned)]
    }


    if(loading){
        return(

            <>loading...
            <progress value={null} />
            </>
        )
    }
    return (
        <>  
            <table>
                <tr>
                    <td></td>
                    {getCleanPlayers().map((player) => (
                        <td>
                            <Player playerId={player}></Player> 
                        </td>
                    ))}
                </tr>
                {getCleanPlayers().map((playerRow) => (
                    <tr>
                        <td>
                            <Player playerId={playerRow}></Player> 
                        </td>
                        {getCleanPlayers().map((playerColumn) => (
                        <td>
                            <MatchUp score={matchUpCalculator(playerRow,playerColumn)}></MatchUp>
                        </td>   
                        ))}
                    </tr>
                ))}
                
            </table>
        </>
    )
}

export default Grid