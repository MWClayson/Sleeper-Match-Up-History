import {getLeague,getRosters, getMatchUps} from './API.js'
export async function matchUpBuilder(leagueIds){

    const matchUpsList = []

    for (const leagueId of leagueIds ){
        const rosterList = await getRosters(leagueId);
        console.log(rosterList);
        const rosterPair = []
        for(const roster of rosterList)
        {
            rosterPair.push({rosterID : roster.roster_id, owner : roster.owner_id})
        }
        console.log(rosterPair);
        let week = 1;
        let continueLooking = true;
        while(continueLooking){
            const matchUps = await getMatchUps(leagueId,week);
            if(matchUps == [] || matchUps == null || matchUps.length == 0){
                continueLooking = false;
                continue;
            }
            for(const matchup of matchUps.filter(m => m.matchup_id != null)){
                
                let matchup2 = matchUps.findLast(i => i.matchup_id == matchup.matchup_id)
                
                if(matchUps.find(i => i.leagueId == leagueId && i.week == week && i.matchup_id == matchUps.matchUpId)){
                    console.log("here!");
                    break;
                }
                if(matchup.roster_id != matchup2.roster_id){
                    matchUpsList.push({
                        leagueId: leagueId,
                        week: week,
                        matchUpId: matchup.matchup_id,
                        team1: rosterPair.find(i => i.rosterID == matchup.roster_id).owner,
                        team1Score: matchup.points,
                        team2: rosterPair.find(i => i.rosterID == matchup2.roster_id).owner,
                        team2Score: matchup2.points
                    })
                }
            }
            week = week+1;
        }


    } 
    return matchUpsList;           

}