import LeagueBumpChart from "../Components/LeagueBumpChart"
import { getRosters, getUser } from "../API";
import { useEffect, useState } from "react"
import { matchUpBuilder } from './../MatchUpBuilder.js';
import { calculateWeeklyPositions } from "../CalculateWeeklyPositions";

function Graph(){
  const [teams,setTeams] = useState([])
  const [matchUpHistory,setMatchUpHistory] = useState({})
 
    useEffect(() =>{ 
      const getData = async () => {
        const teamList = [];
        getRosters("916267273759891456").then((data) => {
            data.forEach(element => {
                getUser(element.owner_id).then((result) =>{
                  teamList.push(result.display_name)
                })
            });
          })

          const matchUps = await matchUpBuilder(["916267273759891456"]);
          await calculateWeeklyPositions("916267273759891456")
          setMatchUpHistory(matchUps)
          setTeams(teamList)
      }
      getData();
     },[])

return(
        <LeagueBumpChart teams={teams}></LeagueBumpChart>
    )
}
export default Graph