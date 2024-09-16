import {getLeagueUrl, getRostersUrl, getUserUrl, getMatchUpsUrl} from './Consts.js'

export function getLeague(leagueId){
    const leagueUrl =  getLeagueUrl.replace('<league_id>',leagueId);
    return fetch(leagueUrl).then(data => data.json());
}

export function getRosters(leagueId){
    const leagueUrl =  getRostersUrl.replace('<league_id>',leagueId);
    return fetch(leagueUrl).then(data => data.json());
}

export function getUser(userId){
    const userUrl =  getUserUrl.replace('<user_id>',userId);
    return fetch(userUrl).then(data => data.json());
}

export function getMatchUps(leagueId,week){
    const MatchUpsUrl = getMatchUpsUrl.replace('<league_id>',leagueId).replace('<week>',week);
    return fetch(MatchUpsUrl).then(data => data.json()); 
}