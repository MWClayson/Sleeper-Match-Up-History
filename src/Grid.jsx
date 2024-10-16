import { useState, useEffect } from 'react'
import { getRosters, getUser } from './API.js';
import Player from './Player.jsx'
import { matchUpBuilder } from './MatchUpBuilder.js';
import MatchUp from './MatchUp.jsx';
import Typography from '@mui/material/Typography';

import * as d3 from "d3";
import MatchUpPopOver from './Components/MatchUpPopOver.jsx';

function Grid({ leagues }) {
    const [loading, setLoading] = useState(true);
    const [players, setPlayers] = useState([])
    const [matchUps, setMatchUps] = useState([])
    const [hoverStats, setHoverStats] = useState([]);
    const [hoverPlayers, setHoverPlayers] = useState({})
    const [anchorEl, setAnchorEl] = useState(null);
    const [minMaxRatio,setMinMaxRatio] = useState({
        MinRatio: Number.MAX_VALUE,
        MaxRatio: -Number.MAX_VALUE
    });


    useEffect(() => {
        setLoading(true);
    
        const fetchPlayersAndMatchUps = async () => {
            const playerList = [];
            const ownerIds = new Set(); // Use Set to keep track of unique owner IDs
    
            // Step 1: Collect all unique owner IDs from the rosters across all leagues
            for (const leagueId of leagues) {
                const rosters = await getRosters(leagueId);
                
                rosters.forEach(roster => {
                    ownerIds.add(roster.owner_id); // Add unique owner_id
                });
            }
            console.log(ownerIds);
            // Step 2: Fetch user data for all unique owner IDs
            const userPromises = Array.from(ownerIds).map(ownerId => getUser(ownerId));
    
            // Wait for all users to be fetched
            const users = await Promise.all(userPromises);
    
            // Populate playerList with fetched user data
            users.forEach(user => {
                playerList.push(user);
            });
    
            // Step 3: Fetch matchups
            const matchUps = await matchUpBuilder(leagues);
    
            // Step 4: Update state after all users and matchups are fetched
            setPlayers(playerList);   
            setMatchUps(matchUps);
            setLoading(false);
        };
    
        // Call the async function
        fetchPlayersAndMatchUps();
    }, [leagues]);
    //const colorFunction = ;

    useEffect(() => {
        // Ensure the calculation only happens when all data is loaded
        if (players.length > 0 && matchUps.length > 0 && !loading) {
            let minRatio = Number.MAX_VALUE;
            let maxRatio = -Number.MAX_VALUE;
    
            // Loop through players to calculate the ratio for all combinations
            players.forEach((teamOne) => {
                players.forEach((teamTwo) => {
                    let ratio = 0;
    
                    // Calculate the ratio for matchups where teamOne is team1
                    matchUps.filter(mu => mu.team1 === teamOne.user_id && mu.team2 === teamTwo.user_id).forEach(matchup => {
                        if (matchup.team1Score > matchup.team2Score) {
                            ratio += 1;
                        } else if (matchup.team1Score < matchup.team2Score) {
                            ratio -= 1;
                        }
                    });
    
                    // Calculate the ratio for matchups where teamOne is team2
                    matchUps.filter(mu => mu.team2 === teamOne.user_id && mu.team1 === teamTwo.user_id).forEach(matchup => {
                        if (matchup.team1Score > matchup.team2Score) {
                            ratio -= 1;
                        } else if (matchup.team1Score < matchup.team2Score) {
                            ratio += 1;
                        }
                    });
    
                    // Update local min and max values based on the calculated ratio
                    minRatio = Math.min(minRatio, ratio);
                    maxRatio = Math.max(maxRatio, ratio);
                });
            });
    
            // Update the state with final calculated values after the loops
            setMinMaxRatio({ MinRatio: minRatio, MaxRatio: maxRatio});
        }
    }, [players, matchUps, loading]);

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

    function setHoverItem(event,teamOne, teamTwo){
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

        let teamOneObject = players.find( i=> i.user_id == teamOne)
        let teamTwoObject = players.find(i => i.user_id == teamTwo)
        
        if (teamOneObject && teamTwoObject) {
            setHoverPlayers({
                teamOne: teamOneObject,
                teamTwo: teamTwoObject
            });
    
            if (matchupsList.length > 0) {
                setAnchorEl(event.currentTarget);
            }
            setHoverStats(matchupsList);
        } else {
            console.warn('One of the teams is not found:', { teamOneObject, teamTwoObject });
        }
    }

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };


      const open = Boolean(anchorEl);


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
                            <td 
                            onMouseEnter={(event) => setHoverItem(event,playerRow.user_id, playerColumn.user_id)}
                            onMouseLeave={handlePopoverClose}

                            >
                                <MatchUp score={matchUpCalculator(playerRow.user_id, playerColumn.user_id)} middle = {playerRow.user_id == playerColumn.user_id } colorFunction = {d3.scaleSequential(d3.interpolateRdYlGn).domain([minMaxRatio.MinRatio,minMaxRatio.MaxRatio])}></MatchUp>
                            </td>   
                        ))}
                    </tr>
                ))}
                
            </table>
            <MatchUpPopOver hoverPlayers = {hoverPlayers} hoverStats = {hoverStats} open = {open} handlePopoverClose = {handlePopoverClose} anchorEl={anchorEl} />
        </>
    )
}

export default Grid