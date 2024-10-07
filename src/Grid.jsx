import { useState, useEffect, useCallback } from 'react'
import { getLeague, getRosters, getUser } from './API.js';
import Player from './Player.jsx'
import { matchUpBuilder } from './MatchUpBuilder.js';
import MatchUp from './MatchUp.jsx';
import Stack from '@mui/material/Stack';
import Popover from '@mui/material/Popover';

function Grid({ leagues }) {
    const [loading, setLoading] = useState(true);
    const [players, setPlayers] = useState([])
    const [matchUps, setMatchUps] = useState([])
    const [hoverStats, setHoverStats] = useState([]);



    useEffect(()=>{
        setLoading(true)
        const playerList = [];
        for (const leagueId of leagues ){       
            getRosters(leagueId)
                .then(result =>{ 
                    result.forEach(x => {
                        const i = playerList.findIndex(e => e.user_id === x.owner_id);
                        console.log(x.owner_id+"PlayerIndex")
                        if (i === -1) {
                            getUser(x.owner_id)
                            .then(result =>{ 
                                playerList.push(result)
                            })              
                        }
                    })
                    
                })
        }
        setPlayers(playerList)    
        matchUpBuilder(leagues).then(result => {
            setMatchUps(result); 
            console.log(matchUps);
            setLoading(false)
        });
        
        
    },[leagues])


    function matchUpCalculator(teamOne, teamTwo){
        let team1Count = 0;
        let team2Count = 0;
        
        let matchupsList = [];

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

    function setHoverItem(teamOne, teamTwo){
        let matchupsList = [];

        

        for(const result of matchUps.filter(mu => mu.team1 == teamOne && mu.team2 == teamTwo)){
            matchupsList.push({
                team1Id: teamOne,
                team2Id: teamTwo,
                leagueName: result.leagueName, 
                season: result.leagueYear,
                week: result.week,
                teamOneScore: result.team1Score,
                teamTwoScore: result.team2Score,

            })
        }
        for(const result of matchUps.filter(mu => mu.team2 == teamOne && mu.team1 == teamTwo  )){
            matchupsList.push({
                team1Id: teamTwo,
                team2Id: teamOne,
                leagueName: result.leagueName, 
                season: result.leagueYear,
                week: result.week,
                teamOneScore: result.team2Score,
                teamTwoScore: result.team1Score
            })
        }
        setHoverStats(matchupsList);
    }


    // function getCleanPlayers(){
    //     const playersCleaned = players.filter(function (el) {
    //         return el != null && el != "";
    //     });
    //     return [...new Set(playersCleaned)]
    // }

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
                    {players.map((player) => (
                        <td>
                            <Player player={player}></Player> 
                        </td>
                    ))}
                </tr>
                {players.map((playerRow) => (
                    <tr>
                        <td>
                            <Player player={playerRow}></Player> 
                        </td>
                        {players.map((playerColumn) => (
                            <td onMouseOver={() => setHoverItem(playerRow.user_id, playerColumn.user_id)}>
                                <MatchUp score={matchUpCalculator(playerRow.user_id, playerColumn.user_id)}></MatchUp>
                            </td>   
                        ))}
                    </tr>
                ))}
                
            </table>
            <Popover>
                <Stack>
                    {/* <p>{s} vs {}</p> */}
                    {hoverStats.map((stat => (
                        <div>
                            <p>League Name: {stat.leagueName ?? ""}</p>
                            <p>season: {stat.season ?? ""}</p>
                            <p>week: {stat.week ?? ""}</p>
                            <p>Team1 Score: {stat.teamOneScore ?? ""}</p>
                            <p>Team2 Score: {stat.teamTwoScore ?? ""}</p>
                        </div>
                    )))}
                </Stack>
            </Popover>

        </>
    )
}

export default Grid